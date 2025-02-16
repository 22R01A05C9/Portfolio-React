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
    collection.insertOne({time:Date(), rating:data.stars, website:data.application, suggestion:data.suggestion})
    res.json({error:false,msg:"Success"})

}

async function getfeedbacks(req,res) {
    let app = req.params?.app
    let db = await connectdb("website","feedbacks")
    let data
    if(app){
        data = await db.find({website:app},{projection:{_id:0}}).toArray()
    }else{
        data = await db.find({},{projection:{_id:0}}).toArray()
    }
    console.log(data);
    res.json(data)
}

module.exports = function(app){
    app.post("/feedback",feedback)
    app.get("/feedback/:app",getfeedbacks)
    app.get("/feedback",getfeedbacks)
}