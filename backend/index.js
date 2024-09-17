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


require("./files.js")(app)

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