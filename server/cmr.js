async function connectdb(connection, collection) {
    try {
        return connection.db("website").collection(collection)
    } catch (err) {
        return { error: err }
    }

}

function getdate() {
    let date = new Date()
    date.setMinutes(date.getMinutes() + 330)
    date = date.toString()
    date = date.slice(0, 24)
    return date
}

const branchmap = new Map([
    ["CSE", "CSE"],
    ["ECE", "ECE"],
    ["CSM", "CSE(AI&ML)"],
    ["CSD", "CSE(DS)"],
    ["CSC", "CSC"],
    ["AIML", "AIML"]
])

async function adddata(data, statsdb1, statsdb2) {
    if ((data.name != null) || (data.roll != null)) {
        data.time = getdate()
        delete data["searchby"]
        if (data.name == null)
            delete data["name"]
        if (data.roll == null)
            delete data["roll"]
        if (data.branch == "ALL")
            delete data["branch"]
        if (data.year == "ALL")
            delete data["year"]
        if (data.page == 1)
            delete data["page"]
        await statsdb2.insertOne(data)
    }
    await statsdb1.updateOne({ app: "cmr" }, { $inc: { count: 1 } })
}

async function extract(body, db) {
    let page = parseInt(body.page)
    let limit = 10
    let skip = (page - 1) * limit
    if (skip < 0) {
        return { error: true, message: "Invalid Page Number" }
    }
    if (db.error) {
        return { error: true, message: db.error }
    }

    let Search = {}
    if (body.searchby === "roll") {
        let roll = body.roll?.replace(" ", "").split("").join('.*')
        let expr = new RegExp(roll, 'i')
        Search.roll = { $regex: expr }
    } else if (body.searchby === "name") {
        let name = body.name?.replace(" ", "").split("").join('\\s*')
        let expr = new RegExp(name, 'i')
        Search.name = { $regex: expr }
    }
    if (body.branch !== "ALL") {
        Search.branch = branchmap.get(body.branch)
    }
    if (body.year !== "ALL") {
        Search.year = body.year
    }
    let data = await db.find(Search, { projection: { _id: 0 } }).skip(skip).limit(limit).toArray()
    return data
}

async function getdata(req, res, db, statsdb1, statsdb2) {
    if (!req.body) {
        res.status(400).json({ error: true, message: "No Body Found" })
        return
    }
    let data = req.body
    if (!data.branch || !data.year || !data.searchby || !data.page) {
        res.status(400).json({ error: true, message: "All Fields Are Required", data: data })
        return
    }
    data.searchby = data.searchby.toLowerCase()
    if (data.searchby !== "roll" && data.searchby !== "name") {
        res.status(400).json({ error: true, message: "Invalid Search By" })
        return
    }
    let pageexp = /^[0-9]{0,3}$/
    if (!pageexp.test(data.page)) {
        res.status(400).json({ error: true, message: "Invalid Page Number" })
        return
    }
    data.year = data.year.toUpperCase()
    if (data.year !== "2022" && data.year !== "2023" && data.year !== "ALL" && data.year !== "2024") {
        res.status(400).json({ error: true, message: "Invalid Year" })
        return
    }
    data.name = data.name ? data.name.toUpperCase() : null
    data.roll = data.roll ? data.roll.toUpperCase() : null
    data.branch = data.branch ? data.branch.toUpperCase() : null
    let result = await extract(data, db)
    if (result.error) {
        res.status(500).json(result)
        return
    }
    let length = result.length
    let response = {
        error: false,
        message: "Data Fetched Successfully",
        data: result,
        length: length
    }
    res.status(200).json(response)
    adddata(data, statsdb1, statsdb2)
}


module.exports = async function (app, connection) {
    let db = await connectdb(connection, "cmr")
    let statsdb1 = await connectdb(connection, "stats")
    let statsdb2 = await connectdb(connection, "cmrstats")
    app.post("/cmr/getdata", (req, res) => {
        getdata(req, res, db, statsdb1, statsdb2)
    })
}