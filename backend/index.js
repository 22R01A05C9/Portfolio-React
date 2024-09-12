const express = require("express")
const app = express()
const server = require("http").createServer(app)
const ws = require("ws")
const wss = new ws.Server({ server: server })
const smsfile = require("./sms.js")
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