const { MongoClient } = require("mongodb")

async function connectdb(db, collection) {
    try {
        let client = new MongoClient(process.env.MONGO_URL)
        const conn = await client.connect()
        return conn.db(db).collection(collection)
    } catch (err) {
        return { error: err }
    }

}

function getdate(){
    let date = new Date()
    date.setMinutes(date.getMinutes() + 330)
    return date.toString()
}

async function feedback(req,res){
    let data = req.body
    if(!data){
        res.json({error:true,message:"No Data Found"})
        return;
    }
    if(!data.stars || !data.application ){
        res.json({error:true,message:"Incomplete Data"})
        return;
    }
    let collection = await connectdb("website","feedbacks")
    collection.insertOne({time:getdate(), rating:data.stars, website:data.application, suggestion:data.suggestion})
    let collection2 = await connectdb("website","stats")
    collection2.updateOne({app:data.application},{$inc:{feedbacks:1}})
    res.json({error:false,msg:"Success"})

}

async function getfeedbacks(req,res) {
    if (req.query.pass !== process.env.PASS) {
        res.json({ error: true, message: "Not Authorized" })
        return
    }
    let app = req.params?.app
    let db = await connectdb("website","feedbacks")
    let data
    if(app){
        data = await db.find({website:app},{projection:{_id:0}}).toArray()
    }else{
        data = await db.find({},{projection:{_id:0}}).toArray()
    }
    res.json(data)
}

module.exports = function(app){
    app.post("/feedback",feedback)
    app.get("/feedback/:app",getfeedbacks)
    app.get("/feedback",getfeedbacks)
}