const cryptojs = require("crypto-js")

function getjobid(url){
    return new Promise((resolve)=>{
        fetch("https://app.publer.io/hooks/media",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "referer":"https://publer.io/",
                "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
            },
            body:JSON.stringify({url:url})
        }).then((res)=>{
            let contenttype = res.headers.get("content-type")
            if(contenttype && contenttype.includes("application/json") === true)
                return res.json()
            return {job_id:null}
        }).then((data)=>{
            resolve(data.job_id)
        })
    })
}

function getstatus(jobid){
    return new Promise((resolve)=>{
        fetch(`https://app.publer.io/api/v1/job_status/${jobid}`).then((res)=>{
            return res.json()
        }).then((data)=>{
            resolve(data)
        })
    })
}

function getdata(url){
    return new Promise(async (resolve)=>{
        let jobid = await getjobid(url)
        while(1){
            let status = await getstatus(jobid)
            if(status.status === "complete"){
                resolve(status)
                break
            }
        }
    })
}

module.exports = function(app){
    app.post("/instagram",(req,res)=>{
        let encdata = req.body.data
        if(!encdata){
            res.json({status:false, message:"invalid data"})
            return
        }
        let decdata = cryptojs.AES.decrypt(encdata, process.env.INSTA_API_KEY).toString(cryptojs.enc.Utf8)
        if(!decdata){
            res.json({status:false, message:"invalid authentication"})
            return
        }
        let url=null;
        try{
            url = JSON.parse(decdata).url
        }catch(e){
            res.json({status:false, message:"invalid json data", error:e})
            return
        }
        if(!url || (!url.startsWith("https://www.instagram.com/") && !url.startsWith("https://instagram.com/"))){
            console.log(url);
            res.json({status:false, message:"invalid url"})
            return
        }
        getdata(url).then((data)=>{
            res.json(data)
        })
    })
}