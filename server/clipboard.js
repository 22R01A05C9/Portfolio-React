const {MongoClient} = require("mongodb")

function getrandid(){
    let num = parseInt(Math.random() * 10000 )
    return num + (num<1000? 1000 : 0)
}

async function connectdb(){
    const client = new MongoClient(process.env.MONGO_URL)
    let conn = await client.connect()
    return conn.db("website").collection("clipboard")
}

async function getdata(id){
    let collection = await connectdb()
    let data = await collection.findOne({id:id})
    return data
}


async function adddata(req,res){
    if(!req.body.data){
        res.json({error:true,message:"No Content Found"})
        return
    }
    let id = getrandid()
    while(await getdata(id)){
        id = getrandid()
    }
    res.json({error:false, id:id})
    let collection = await connectdb()
    await collection.insertOne({id:id, data:req.body.data})
}

module.exports = function(app){
    app.post("/clipboard/add",adddata)
    app.post("/clipboard/get", (req,res)=>{
        if(!req.body.id){
            res.json({error:true, message:"No ID Found"})
            return
        }
        getdata(req.body.id).then((data)=>{
            if(!data){
                res.json({error:true, message:"No Content Found"})
                return
            }
            res.json({error:false, data:data.data})
        })
        
    })
}

