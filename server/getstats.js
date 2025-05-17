module.exports = function (app, connection) {
    const getstats = async (req,res)=>{
        if(req.query.pass !== process.env.PASS) 
            return res.json({error:true,message:"Not Authorized"})
        let collection = req.params.app
        if (collection == null) collection = "stats"
        let stats = connection.db("website").collection(collection);
        let data = await stats.find({},{"projection":{_id:0}}).toArray();
        res.json(data)
    }

    app.get("/stats/:app",getstats)
}