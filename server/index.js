const express = require("express")
const ws = require("ws")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const { startsmsprocessing } = require("./sms.js")
const { MongoClient } = require("mongodb")
const app = express()
app.set('trust proxy', 1)
app.use(function (req, res, next) {
    try {
        decodeURIComponent(req.path)
        next()
    } catch (err) {
        //change after backend
        res.redirect("https://saiteja.site")
    }
})
app.use(cors())
app.use(express.json({ limit: "30mb" }))
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        res.status(400).send({ error: true, message: "Invalid JSON" })
    } else {
        next()
    }
}
)

const server = require("http").createServer(app)
const wss = new ws.Server({ server: server })



const uri = process.env.MONGO_URL
const client = new MongoClient(uri)
client.connect().then((connection) => {
    require("./files.js")(app, connection)
    require("./url.js")(app, connection)
    require("./instagram.js")(app)
    require("./mines.js")(app, connection)
    require("./cmr.js")(app, connection)
    require("./clipboard.js")(app, connection)
    require("./yt.js")(app)
    require("./feedback.js")(app, connection)
    require("./contact.js")(app, connection)
    require("./getstats.js")(app, connection)
    wss.on("connection", (ws) => {
        ws.send(JSON.stringify({ error: false, message: "please send the data in correct format" }))
        ws.on("message", async function incoming(message) {
            startsmsprocessing(message, ws, connection)
        })
    })
}).catch((err) => {
    console.log("MongoDB connection error: ", err)
})



server.listen(process.env.PORT, () => {
    console.log("server staretd on http://localhost:" + process.env.PORT);
})