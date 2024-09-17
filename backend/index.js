const express = require("express")
const ws = require("ws")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const server = require("http").createServer(app)
const wss = new ws.Server({ server: server })


require("./files.js")(app)
require("./sms.js")(wss)


server.listen(5000,'0.0.0.0',()=>{
    console.log("server staretd on http://localhost:5000");
})