function getdate() {
    let date = new Date()
    date.setMinutes(date.getMinutes() + 330)
    return date.toString()
}

async function feedback(req, res, connection) {
    let data = req.body
    if (!data) {
        res.json({ error: true, message: "No Data Found" })
        return;
    }
    if (!data.stars || !data.application) {
        res.json({ error: true, message: "Incomplete Data" })
        return;
    }
    let collection = connection.db("website").collection("feedbacks")
    collection.insertOne({ time: getdate(), rating: data.stars, website: data.application, suggestion: data.suggestion })
    let collection2 = connection.db("website").collection("stats")
    collection2.updateOne({ app: data.application }, { $inc: { feedbacks: 1 } })
    res.json({ error: false, msg: "Success" })

}

async function getfeedbacks(req, res, connection) {
    if (req.query.pass !== process.env.PASS) {
        res.json({ error: true, message: "Not Authorized" })
        return
    }
    let app = req.params?.app
    let db = connection.db("website").collection("feedbacks")
    let data
    if (app) {
        data = await db.find({ website: app }, { projection: { _id: 0 } }).toArray()
    } else {
        data = await db.find({}, { projection: { _id: 0 } }).toArray()
    }
    res.json(data)
}

module.exports = function (app, connection) {
    app.post("/feedback", (req, res) => {
        feedback(req, res, connection)
    })
    app.get("/feedback/:app", (req, res) => {
        getfeedbacks(req, res, connection)
    })
    app.get("/feedback", (req, res) => {
        getfeedbacks(req, res, connection)
    })
}