const { MongoClient } = require("mongodb")
const cryptojs = require("crypto-js")
async function connectdb(db, collection) {
    try {
        let client = new MongoClient(process.env.MONGO_URL)
        const conn = await client.connect()
        return conn.db(db).collection(collection)
    } catch (err) {
        return { error: err }
    }

}

async function regular(body) {
    let db = await connectdb("cmr", body.year)
    if (db.error) {
        return { error: db.error }
    }
    let data = await db.find({}).toArray()
    let res = []
    if (body.searchby === "name") {
        let expr = new RegExp(body.name)
        data.forEach(element => {
            if (expr.test(element.name)) {
                if (body.branch === "all") {
                    res.push(element)
                } else if (element.branch === body.branch) {
                    res.push(element)
                }
            }
        });
    } else if (body.searchby === "roll") {
        let exp = new RegExp(body.roll)
        data.forEach(element => {
            if (exp.test(element.roll)) {
                if (body.branch === "all") {
                    res.push(element)
                } else if (element.branch === body.branch) {
                    res.push(element)
                }
            }
        });
    }
    return res
}

async function getdata(req, res) {
    if (!req.body.token) {
        res.json({ error: "Invalid Request No Token Found" })
        return
    }
    let temp = cryptojs.AES.decrypt(req.body.token, process.env.CMR_API_KEY).toString(cryptojs.enc.Utf8)
    if (!temp) {
        res.json({ error: "Invalid Encryption" })
        return
    }
    let data = JSON.parse(temp)
    if ((!data.roll && !data.name) || !data.branch || !data.year || !data.searchby) {
        res.json({ error: "All Fields Are Required", data: data })
        return
    }
    res.json(await regular(data))
}


module.exports = function (app) {
    app.post("/cmr/getdata", getdata)
}