function getrandid() {
    let num = parseInt(Math.random() * 10000)
    return num + (num < 1000 ? 1000 : 0)
}

async function getdata(id, connection) {
    let collection = connection.db("website").collection("clipboard")
    let data = await collection.findOne({ id: id })
    return data
}


async function adddata(req, res, connection) {
    if (!req.body.data) {
        res.json({ error: true, message: "No Content Found" })
        return
    }
    let id = getrandid()
    while (await getdata(id, connection)) {
        id = getrandid()
    }
    res.json({ error: false, id: id })
    let collection = await connectdb()
    await collection.insertOne({ id: id, data: req.body.data })
}

module.exports = function (app, connection) {
    app.post("/clipboard/add", (req, res) => { 
        adddata(req, res, connection) 
    })
    app.post("/clipboard/get", (req, res) => {
        if (!req.body.id) {
            res.json({ error: true, message: "No ID Found" })
            return
        }
        getdata(req.body.id, connection).then((data) => {
            if (!data) {
                res.json({ error: true, message: "No Content Found" })
                return
            }
            res.json({ error: false, data: data.data })
        })

    })
}

