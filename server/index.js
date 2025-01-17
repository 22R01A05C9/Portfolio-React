const express = require("express")
const ws = require("ws")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
app.use(function (req, res, next) {
    try {
        decodeURIComponent(req.path)
        next()
    } catch (err) {
        //change after backend
        res.redirect("https://saiteja.fun")
    }
})
app.use(cors())
app.use(express.json())

const server = require("http").createServer(app)
const wss = new ws.Server({ server: server })


require("./files.js")(app)
require("./url.js")(app)
require("./sms.js")(wss)
require("./instagram.js")(app)
require("./mines.js")(app)
require("./cmr.js")(app)
require("./clipboard.js")(app)
require("./yt.js")(app)

server.listen(process.env.PORT, () => {
    console.log("server staretd on http://localhost:" + process.env.PORT);
})