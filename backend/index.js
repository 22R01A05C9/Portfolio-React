const express = require("express")
const ws = require("ws")
const cors = require("cors")
const multer = require("multer")
const {MongoClient} = require("mongodb")
const fs = require("fs")
const smsfile = require("./sms.js")

const app = express()
app.use(cors())
app.use(express.json())

const server = require("http").createServer(app)
const wss = new ws.Server({ server: server })


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

async function getfilesrandomid(){
    return new Promise(async (resolve)=>{
        let client = await MongoClient.connect("mongodb://localhost:27017")
        let db = client.db("website")
        let files = db.collection("files")
        let status = true
        let rand
        while(status){
            rand = Math.floor(Math.random()*10000)
            if(rand<1000)   rand+=1000;
            status = await files.findOne({id:rand})
        }
        resolve(rand)
    })
    
}

function removefiledata(fileid, filesdb){
    setTimeout(()=>{
        fs.rm("./filesdb/"+fileid, {recursive:true,force:true},()=>{})
        filesdb.deleteOne({id:fileid})
    }, 1000*60*120)
}

async function addfiledatatodb(fileid, filename){
    let client = await MongoClient.connect("mongodb://localhost:27017")
    let db = client.db("website")
    let files = db.collection("files")
    files.insertOne({id:fileid, filename:filename})
    removefiledata(fileid,files)
}

async function getfiledata(fileid){
    let client = await MongoClient.connect("mongodb://localhost:27017")
    let db = client.db("website")
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
    let id = req.body.id;
    getfiledata(id).then((data)=>{
        if(data){
            res.json({status:true, redirect:"/files/download/"+id})
        }else{
            res.json({status:false})
        }
    })
})

wss.on("connection", function connection(ws) {
    console.log("A new client connected")
    ws.on("message", function incoming(message) {
        let res;
        try{
            res = JSON.parse(message)
        }catch(err){
            return;
        }
        if(res){
            smsfile.sendsms(res.number,ws,res.times,res.speed)
        }
    })
})

server.listen(5000,()=>{
    console.log("server staretd on http://localhost:5000");
})