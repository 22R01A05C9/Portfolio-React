const multer = require("multer")
const fs = require("fs")
const {MongoClient} = require("mongodb")
const cryptojs = require("crypto-js")
const dotenv = require("dotenv")
dotenv.config()

module.exports = async function (app){
    let connect = await MongoClient.connect("mongodb://localhost:27017")
    async function getfilesrandomid(){
        return new Promise(async (resolve)=>{
            let files = db.collection("files")
            let temp = await files.find().toArray()
            let ids = []
            temp.forEach((file)=>{
                ids.push(parseInt(file.id))
            })
            let rand=1234
            while(ids.includes(rand)){
                rand = Math.floor(Math.random()*10000)
                if(rand<1000)   rand+=1000;
            }
            resolve(rand)
        })
        
    }

    let db = connect.db("website")
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            getfilesrandomid().then((filerand)=>{
                fs.mkdir("./filesdb/"+filerand,()=>{})
                cb(null, './filesdb/'+filerand)
            })
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
    
    const upload = multer({ storage: storage })

    function removefiledata(fileid, filesdb){
        setTimeout(()=>{
            fs.rm("./filesdb/"+fileid, {recursive:true,force:true},()=>{})
            filesdb.deleteOne({id:fileid})
        }, 1000*60*120)
    }
    
    async function addfiledatatodb(fileid, filename){
        let db = connect.db("website")
        let files = db.collection("files")
        files.insertOne({id:fileid, filename:filename})
        removefiledata(fileid,files)
    }
    
    async function getfiledata(fileid){
        let files = db.collection("files")
        return await files.findOne({id:fileid})
    }
    
    
    app.post("/files/upload", upload.single("file"), function (req, res) {
        try{
            let fileid = req.file.destination.split("/")[2]
            let filename = req.file.originalname
            addfiledatatodb(fileid, filename)
            res.json({status:true,id:fileid})
        }catch(err){
            res.json({status:false})
        }
    })
    
    app.get("/files/download/:id",(req,res)=>{
        let id = req.params.id;
        getfiledata(id).then((data)=>{
            if(data){
                res.download("./filesdb/"+id+"/"+data.filename)
            }else{
                res.send("cannot find file")
            }
        })
    })
    
    app.post("/files/download",(req,res)=>{
        let token = req.body.token;
        if(!token){
            res.json({status:false,message:"Invalid Token"})
            return;
        }
        let data = cryptojs.AES.decrypt(token, process.env.FILES_API_KEY).toString(cryptojs.enc.Utf8);
        if(!data){
            res.json({status:false,messgae:"Invalid Authentication"})
            return
        }
        data = JSON.parse(data)
        let regexp = /^[0-9]{4}$/
        if(!regexp.test(data.id)){
            res.json({status:false, message:"Invalid File Id"})
            return
        }
        getfiledata(data.id).then((data)=>{
            if(data){
                res.json({status:true, redirect:"/files/download/"+id})
            }else{
                res.json({status:false,message:"No File Found"})
            }
        })
    })
}