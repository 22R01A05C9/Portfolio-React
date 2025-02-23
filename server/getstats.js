const {MongoClient} = require('mongodb');
let client = new MongoClient(process.env.MONGO_URL);

module.exports = function (app) {
    const getstats = async (req,res)=>{
        if(req.query.pass !== process.env.PASS) 
            return res.json({error:true,message:"Not Authorized"})
        let conn = await client.connect();
        let stats = conn.db("website").collection("stats");
        let data = await stats.find({},{"projection":{_id:0}}).toArray();
        res.json(data)
    }

    app.get("/stats",getstats)
}