const crypto = require("crypto-js");
const { randomUUID } = require("crypto");

module.exports = async function (app, connection) {
    let coderegexp = /^[a-zA-Z0-9]{1,15}$/
    let db = connection.db("website")
    let collection = db.collection("url")
    let userscollection = db.collection("urlusers")

    function checkdata(req, res, next) {
        let data = req.body
        if (!data) return res.json({ error: true, message: "No Data Found" })
        next()
    }

    function checktoken(req, res, next) {
        let token = req.body.token;
        if (!token) {
            return res.json({ error: true, message: "No Token Found" });
        }
        let uid;
        try {
            uid = crypto.AES.decrypt(token, process.env.URL_CODE).toString(crypto.enc.Utf8);
        } catch (e) {
            return res.json({ error: true, message: "Invalid Token" })
        }
        if (!uid) {
            return res.json({ error: true, message: "Invalid Token" });
        }
        req.body.uid = uid
        next()
    }

    async function checkuid(req, res, next) {
        let uid = req.body.uid
        let user = await userscollection.findOne({ uid: uid });
        if (!user) {
            return res.json({ error: true, message: "User Not Found" });
        }
        req.body.user = user
        next()
    }

    function checkcode(req, res, next) {
        let code = req.body?.code || req.params?.code
        if (!code) {
            return res.json({ error: true, message: "No Code Found" });
        }
        if (!coderegexp.test(code)) {
            return res.json({ error: true, message: "Invalid Code" });
        }
        if (req.body?.long && "https://url.saiteja.site/" + code === req.body.long) {
            return res.json({ error: true, message: "Code Cannot Be Same As Long URL" });
        }
        next()
    }

    async function checkcodeexists(req, res, next) {
        let code = req.body?.code || req.params?.code
        let urldata = await collection.findOne({ code: code });
        if (urldata) {
            return res.json({ error: true, message: "Code Already Exists" });
        }
        if (req.body)
            req.body.urldata = urldata
        else req.urldata = urldata
        next()
    }

    async function checkcodedosentexist(req, res, next) {
        let code = req.body?.code || req.params?.code
        let urldata = await collection.findOne({ code: code });
        if (!urldata && req.body) {
            return res.json({ error: true, message: "Code Doesn't Exists" });
        }
        if (!urldata) {
            return res.redirect("https://saiteja.site/404")
        }
        if (req.body)
            req.body.urldata = urldata
        else req.urldata = urldata
        next()
    }

    function checklong(req, res, next) {
        let lonregexp = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[^\s]*)?$/i;
        let long = req.body.long
        if (!long) {
            return res.json({ error: true, message: "No Long URL Found" });
        }
        if (!lonregexp.test(long)) {
            return res.json({ error: true, message: "Invalid Long URL" });
        }
        next()
    }

    function checkcodebelongstouser(req, res, next) {
        let user = req.body.user
        let code = req.body.code
        let userurls = user.codes
        if (!(userurls.includes(code))) {
            res.json({ error: true, message: "Code Doesn't Belong To User" })
            return;
        }
        next()
    }

    function handeltoken(token, code) {
        let uid;
        if (!token) {
            uid = randomUUID();
        } else {
            uid = crypto.AES.decrypt(token, process.env.URL_CODE).toString(crypto.enc.Utf8);
            if (!uid) {
                uid = randomUUID();
            }
        }
        userscollection.findOne({ uid: uid }).then(user => {
            if (!user) {
                userscollection.insertOne({ uid: uid, codes: [code] });
            } else {
                userscollection.updateOne({ uid: uid }, {
                    $addToSet: { codes: code }
                });
            }
        })
        return crypto.AES.encrypt(uid, process.env.URL_CODE).toString();
    }

    app.post("/url/add", checkdata, checklong, checkcode, checkcodeexists, async (req, res) => {
        let data = req.body
        let token = handeltoken(data.token, data.code)
        let result = await collection.insertOne({
            long: data.long,
            code: data.code,
            count: 0
        });
        if (result && result.insertedId) {
            return res.status(200).json({ error: false, message: "URL Generated Successfully", url: "https://url.saiteja.site/" + data.code, token: token });
        } else {
            return res.status(500).json({ error: true, message: "Failed to Add URL" });
        }
    })

    app.post("/url/getdashdata", checkdata, checktoken, checkuid, async (req, res) => {
        let user = req.body.user
        let codes = user.codes;
        let urls = await collection.find({ code: { $in: codes } }, { projection: { _id: 0 } }).toArray();
        return res.json({ error: false, urls: urls });
    })

    app.post("/url/deleteurl", checkdata, checktoken, checkuid, checkcode, checkcodedosentexist, checkcodebelongstouser, async (req, res) => {
        let code = req.body.code
        let newurls = req.body.user.codes.filter(item => item != code)
        userscollection.updateOne({ uid: req.body.uid }, { $set: { codes: newurls } })
        collection.deleteOne({ code: code })
        res.json({ error: false, message: "Deleted Successfully" })
    })

    app.post("/url/edit", checkdata, checktoken, checkuid, checklong, checkcode, checkcodedosentexist, checkcodebelongstouser, async (req, res) => {
        collection.updateOne({ code: req.body.code }, { $set: { long: req.body.long } })
        return res.json({ error: false, message: "Edited Successfully" })
    })

    app.get("/urlredirect/:code", checkcode, checkcodedosentexist, async (req, res) => {
        let urldata = req.body.urldata
        let long = urldata.long.startsWith("http") ? urldata.long : "https://" + urldata.long
        collection.updateOne({ code: req.params.code }, { $inc: { count: 1 } });
        return res.redirect(long);
    })
}