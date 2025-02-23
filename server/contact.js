const {MongoClient} = require('mongodb');
let client = new MongoClient(process.env.MONGO_URL);

module.exports = function (app) {
    const getdate = ()=>{
        let date = new Date()
        date.setMinutes(date.getMinutes() + 330)
        return date.toString();
    }
    const putcontact = async (data)=>{
        data.time = getdate()
        let conn = await client.connect();
        let contact = conn.db("website").collection("contact");
        contact.insertOne(data);
    }
    const getcontact = async (req,res)=>{
        if(req.query.pass !== process.env.PASS) 
            return res.json({error:true,message:"Not Authorized"})
        let conn = await client.connect();
        let contact = conn.db("website").collection("contact");
        let data = await contact.find({},{"projection":{_id:0}}).toArray();
        res.json(data)
    }
    app.post("/contact",(req,res)=>{
        let data = req.body;
        putcontact(data)
        res.json({error:false,message:"Message Sent"})
    })
    app.get("/contact",getcontact)
}