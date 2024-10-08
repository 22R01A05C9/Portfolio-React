function insta(url){
    return new Promise((resolve)=>{
        let headers={
            "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        let fd = new FormData();
        fd.append("link",url)
        fd.append("downloader","photo")
        fetch("https://indownloader.app/request",{
            method:"POST",
            headers:headers,
            body:fd
        }).then((res)=>{
            let ct = res.headers.get("content-type")
            if(ct && ct.includes("text/html")){
                return res.text()
            }else{
                resolve({status:false,message:"Some Error Occured"})
            }
        }).then((data=>{
            let res = JSON.parse(data);
            if(res.error != false){
                resolve({status:false,message:"No Post Found"})
                return
            }
            let html = decodeURI(res.html)
            let downloadlink = html.split('href="')[1].split("\">Download </a>")[0]
            let imagelink = html.split('<img src="')[1].split('">')[0]
            resolve({status:true,imagelink:imagelink,downloadlink:downloadlink})
        }))
    })
}

insta("https://www.instagram.com/stories/cmr.things/3462231204823410971/").then((data)=>{
    console.log(data)
})