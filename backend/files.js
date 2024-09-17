const multer = require("multer")
const fs = require("fs")
const {MongoClient} = require("mongodb")
const cryptojs = require("crypto-js")
const dotenv = require("dotenv")
dotenv.config()

module.exports = async function (app){
    function randomstring(len){
        let chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'
        let res = ""
        for(let i=0;i<len;i++){
            res+=chars.charAt(Math.floor(Math.random()*(chars.length)))
        }
        return res
    }

    function getfilesrandomid(){
        rand = Math.floor(Math.random()*10000)
        if(rand<1000)   rand+=1000;
        return rand;
    }

    let connect = await MongoClient.connect("mongodb://localhost:27017")
    let db = connect.db("website")

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            let randstr = randomstring(15)
            fs.mkdir("./filesdb/"+randstr,()=>{})
            cb(null, './filesdb/'+randstr)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
    
    const upload = multer({ storage: storage })

    function removefiledata(filestr, filesdb){
        setTimeout(()=>{
            fs.rm("./filesdb/"+filestr, {recursive:true,force:true},()=>{})
            filesdb.deleteOne({filestr:filestr})
        }, 1000*60*120)
    }
    
    async function addfiledatatodb(fileid, filename, deleteondownload, filestr){
        let files = db.collection("files")
        files.insertOne({id:fileid, filename:filename, deleteondownload:deleteondownload,filestr:filestr})
        removefiledata(filestr,files)
    }
    
    async function getfiledata(filestr){
        let files = db.collection("files")
        let res1 = await files.findOne({filestr:filestr})
        let res2 = await files.findOne({id:filestr})
        return res1||res2
    }
    
    
    app.post("/files/upload", upload.single("file"), function (req, res) {
        try{
            let filestr = req.file?.destination.split("/")[2]
            let fileid = getfilesrandomid();
            if(!filestr){
                res.json({status:false,message:"No File Found"})
                return;
            }
            let deleteondownload=req.body.deleteondownload;
            if(!deleteondownload){
                res.json({status:false,message:"No Deleteondownload Data"})
                fs.rm("./filesdb/"+filestr,{recursive:true,force:true},()=>{})
                return;
            }
            let filename = req.file.originalname
            addfiledatatodb(fileid, filename, req.body.deleteondownload, filestr)
            res.json({status:true,id:fileid,str:filestr})
        }catch(err){
            fs.rm("./filesdb/"+filestr,{recursive:true,force:true},()=>{})
            res.json({status:false})
        }
    })
    
    app.get("/files/download/:id",(req,res)=>{
        let id = req.params.id;
        getfiledata(id).then((data)=>{
            if(data){
                res.download("./filesdb/"+id+"/"+data.filename,(err)=>{
                    if(err){
                        res.send({err:err,msg:"Error Occured"})
                        return 
                    }else if(data.deleteondownload === "true"){
                        fs.rm("./filesdb/"+id,{recursive:true,force:true},()=>{})
                    }
                })
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
        getfiledata(parseInt(data.id)).then((data)=>{
            if(data){
                res.json({status:true, redirect:"/files/download/"+data.filestr})
            }else{
                res.json({status:false,message:"No File Found"})
            }
        })
    })
}