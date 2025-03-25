const multer = require("multer")
const fs = require("fs")
const { MongoClient } = require("mongodb")
const cryptojs = require("crypto-js")
const dotenv = require("dotenv")
const path = require("path")
const ratelimiter = require("express-rate-limit")
const limiteroptions = {
    windowMs: 1000 * 60,
    limit: 10,
    statusCode: 200,
    message: { status: false, message: "Too Many Requests" },
    legacyHeaders: false,
    standardHeaders: true
}
const uploadlimiter = ratelimiter(limiteroptions)
const downloadlimiter = ratelimiter(limiteroptions)
const getfilelimiter = ratelimiter(limiteroptions)
const codelimiter = ratelimiter(limiteroptions)
dotenv.config()

const cleardata = async () => {
    let client = new MongoClient(process.env.MONGO_URL)
    let conn = await client.connect()
    let db = conn.db("website")
    let files = db.collection("files")
    files.deleteMany({})
    let filesdbpath = path.resolve(__dirname, "filesdb" )
    fs.rm(filesdbpath, { recursive: true, force:true }, () => {
        fs.mkdir(filesdbpath, () => { })
    })
}

module.exports = async function (app) {
    cleardata()
    function randomstring(len) {
        let chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'
        let res = ""
        for (let i = 0; i < len; i++) {
            res += chars.charAt(Math.floor(Math.random() * (chars.length)))
        }
        return res
    }

    function getfilesrandomid() {
        rand = Math.floor(Math.random() * 10000)
        if (rand < 1000) rand += 1000;
        return rand;
    }

    let connect = await MongoClient.connect(process.env.MONGO_URL)
    let db = connect.db("website")
    const updatedownloads = async () => {
        let stats = db.collection("stats")
        stats.updateOne({ app: "files" }, { $inc: { downloads: 1 } })
    }
    const updateuploads = async () => {
        let stats = db.collection("stats")
        stats.updateOne({ app: "files" }, { $inc: { uploads: 1 } })
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './filesdb/')
        },
        filename: function (req, file, cb) {
            let randstr = randomstring(15)
            cb(null, randstr)
        }
    })

    const upload = multer({ storage: storage })

    function removefiledata(filestr, filesdb) {
        setTimeout(() => {
            filesdb.findOne({ filestr: filestr }).then((data) => {
                if (data) {
                    fs.rm("./filesdb/" + filestr, { recursive: true, force: true }, () => { })
                    filesdb.deleteOne({ filestr: filestr })
                }
            })
        }, 1000 * 60 * process.env.FILES_MINUTES)
    }

    async function addfiledatatodb(fileid, filename, deleteondownload, filestr, size) {
        let files = db.collection("files")
        files.insertOne({ id: fileid, filename: filename, deleteondownload: deleteondownload, filestr: filestr, size: size })
        removefiledata(filestr, files)
    }

    async function getfiledata(filestr) {
        let files = db.collection("files")
        let res1 = await files.findOne({ filestr: filestr })
        let res2 = await files.findOne({ id: filestr })
        return res1 || res2
    }


    app.post("/files/cverify", codelimiter, (req, res) => {
        let ccode = req.body.ccode;
        if (!ccode) {
            res.json({ status: false, message: "No Code Provided" })
            return;
        }
        let regexp = /^[0-9]{4}$/
        if (!regexp.test(ccode)) {
            res.json({ status: false, message: "Invalid Code" })
            return;
        }
        getfiledata(parseInt(ccode)).then((data) => {
            if (data) {
                res.json({ status: false, message: "Code Exists" })
            } else {
                res.json({ status: true, message: "Code Available" })
            }
        })
    })


    app.post("/files/upload", uploadlimiter, upload.single("file"), function (req, res) {
        try {
            let filestr = req.file?.filename;
            let fileid = getfilesrandomid();
            if (!filestr) {
                res.json({ status: false, message: "No File Found" })
                return;
            }
            let filename = req.file.originalname
            let deleteondownload = req.body.deleteondownload;
            if (!deleteondownload || (deleteondownload !== "false" && deleteondownload !== "true")) {
                res.json({ status: false, message: "No Deleteondownload Data" })
                fs.rm("./filesdb/" + filestr, { recursive: true, force: true }, () => { })
                return;
            }
            let size = req.body.size;
            let exp = /^[0-9]{1,2}.[0-9]{2} MB$/
            if (!size || !exp.test(size)) {
                res.json({ status: false, message: "No Size Data" })
                fs.rm("./filesdb/" + filestr, { recursive: true, force: true }, () => { })
                return;
            }
            let customstatus = req.body.customstatus;
            if (!customstatus || (customstatus !== "false" && customstatus !== "true")) {
                res.json({ status: false, message: "No Custom Id Data" })
                fs.rm("./filesdb/" + filestr, { recursive: true, force: true }, () => { })
                return;
            }
            if (customstatus === "true") {
                let customid = req.body.customid;
                if (!customid) {
                    res.json({ status: false, message: "No Custom Id Provided" })
                    fs.rm("./filesdb/" + filestr, { recursive: true, force: true }, () => { })
                    return;
                }
                let regexp = /^[0-9]{4}$/
                if (!regexp.test(customid)) {
                    res.json({ status: false, message: "Invalid Custom Id" })
                    fs.rm("./filesdb/" + filestr, { recursive: true, force: true }, () => { })
                    return;
                }
                fileid = parseInt(customid)
            }
            getfiledata(fileid).then((data) => {
                if (data) {
                    res.json({ status: false, message: "Custom Id Already Used" })
                    fs.rm("./filesdb/" + filestr, { recursive: true, force: true }, () => { })
                } else {
                    addfiledatatodb(fileid, filename, deleteondownload, filestr, size)
                    res.json({ status: true, id: fileid, str: filestr })
                    updateuploads()
                }
            })
        } catch (err) {
            fs.rm("./filesdb/" + filestr, { recursive: true, force: true }, () => { })
            res.json({ status: false, message: "Some Error Occuerd" })
        }
    })

    app.get("/files/download/:id", getfilelimiter, (req, res) => {
        if (req.headers.range) {
            return res.status(416).send("Range requests are not supported");
        }
        let id = req.params.id;
        getfiledata(id).then((data) => {
            if (data) {
                let filepath = path.resolve(__dirname, "filesdb", id);
                res.download(filepath, data.filename, (err) => {
                    if (err) {
                        console.log("err:" + err);
                        res.json({ status: false, message: "File Not Found" })
                        return
                    } else if (data.deleteondownload === "true") {
                        fs.rm("./filesdb/" + id, { recursive: true, force: true }, () => { })
                        let files = db.collection("files")
                        files.deleteOne({ filestr: data.filestr })
                    }
                })
            } else {
                //add the link after creating frontend
                res.redirect("https://saiteja.site/files?error=File Not Found")
            }
        })
    })

    app.post("/files/download", downloadlimiter, (req, res) => {
        let token = req.body.token;
        if (!token) {
            res.json({ status: false, message: "Invalid Token" })
            return;
        }
        let data = cryptojs.AES.decrypt(token, process.env.FILES_API_KEY).toString(cryptojs.enc.Utf8);
        if (!data) {
            res.json({ status: false, messgae: "Invalid Authentication" })
            return
        }
        data = JSON.parse(data)
        let regexp = /^[0-9]{4}$/
        if (!regexp.test(data.id)) {
            res.json({ status: false, message: "Invalid File Id" })
            return
        }
        getfiledata(parseInt(data.id)).then((data) => {
            if (data) {
                res.json({ status: true, redirect: ("/files/download/" + data.filestr), name: data.filename, size: data.size })
                updatedownloads()
            } else {
                res.json({ status: false, message: "No File Found" })
            }
        })
    })
}