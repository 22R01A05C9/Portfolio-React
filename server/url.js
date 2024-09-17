const {MongoClient} = require("mongodb")

module.exports = async function (app){
    let connect = await MongoClient.connect("mongodb://localhost:27017")
    let db = connect.db("website")
    let collection = db.collection("url")
    async function geturldata(code){
        return new Promise((resolve)=>{
            collection.findOne({code:code}).then((data)=>{
                resolve(data)
            })
        })
    }
    function addurldata(code,url){
        return new Promise((resolve)=>{
            collection.insertOne({code:code,url:url,count:0}).then((data)=>{
                resolve(data)
            })
        })
    }
    function getrandomstring(len){
        let chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'
        let res = ""
        for(let i=0;i<len;i++){
            res+=chars.charAt(Math.floor(Math.random()*(chars.length)))
        }
        return res
    }
    app.post("/url/checkurl",(req,res)=>{
        let code = req.body.code
        if(!code){
            return res.json({status:false,message:"No Code Found"})
        }
        let regexp = /^[a-zA-Z0-9]{1,30}$/
        if(!regexp.test(code)){
            return res.json({status:false, message:"Invalid Code"})
        }
        geturldata(code).then((data)=>{
            if(data == null) data = {status:true,message:"No Url Found"}
            res.json({status:false,...data})
        })
    })

    app.post("/url/addurl",(req,res)=>{
        let url = req.body.url
        let regexp = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
        if(!regexp.test(url)){
            return res.json({status:false, message:"Invalid Url"})
        }
        let customchoice = req.body.customchoice
        if(customchoice == "true"){
            let customcode = req.body.customcode
            let regexp1 = /^[a-zA-Z0-9]{1,30}$/
            if(!regexp1.test(customcode)) 
                return res.json({status:false, message:"Invalid Custom Code"})
            geturldata(customcode).then((data)=>{
                if(data != null){
                    return res.json({status:false, message:"Code Already Exists"})
                }
                addurldata(customcode, url).then((data)=>{
                    res.json({status:true, message:"Url Added Successfully"})
                })
            })
        }else{
            let code = getrandomstring(6);
            addurldata(code, url).then((data)=>{
                res.json({status:true, message:"Url Added Successfully", code:code})
            })
        }
    })

    app.get("/url/:code",(req, res)=>{
        let code;
        try{
            code = req.params.code
        }catch(err){
            return res.json({status:false, message:"Invalid Code"})
        }
        let regexp = /^[a-zA-Z0-9]{1,30}$/
        if(!regexp.test(code)) 
            return res.json({status:false, message:"Invalid Code"})
        geturldata(code).then((data)=>{
            if(data === null){
                res.json({status:false,message:"No Url Found"})
            }else{
                res.redirect(data.url)
                collection.updateOne({code:code},{$inc:{count:1}})
            }
        })
    })

    app.post("/url/getstats",(req,res)=>{
        let codes = req.body.codes
        if(!codes) return res.json({status:false, message:"No Codes Found"})
        let ans = new Object()
        let regexp = /^[a-zA-Z0-9]{1,30}$/
        for(let i=0;i<codes.length;i++){
            if(!regexp.test(codes[i])){
                return res.json({status:false, message:"Invalid Code Found"})
            }
            geturldata(codes[i]).then((data)=>{
                console.log(codes[i]);
                ans[codes[i]] = (data ? data.count : 0)
                if(Object.keys(ans).length==codes.length){
                    res.json({status:true, data:ans})
                }
            })
        }
    })

}