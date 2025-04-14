import { debounce } from "lodash";
const getdata = debounce((e, searchby, branch, year, page, setdata, setShowload, append, done=null, setLoading=null) => {
    const random = ()=> {
        return Math.floor(Math.random() * 1000000) + Math.floor(Math.random() * 1000000);
    }
    if(setLoading){
        setLoading(true)
    }
    let pdata = {
        searchby: searchby,
        branch: branch,
        year: year,
        page: page
    }
    if(searchby === "Name"){    
        pdata.name = e.value
    }else if(searchby === "Roll"){
        pdata.roll = e.value
    }
    fetch("/api/cmr/getdata", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pdata)
    }).then(res => res.json()).then(res => {
        if(res.error) {
            alert(res.message)
            return
        }
        res.data.map((item) => {
            item.key= random()
            return item
        })
        const imagepromises = res.data.map((item) => {
            return new Promise((resolve)=>{
                const img = new Image()
                img.src = `https://cmrstatic.saiteja.site/${item.roll}.jpg`
                img.onload = img.onerror = resolve
            })
        })
        Promise.all(imagepromises).then(() =>{
            if(append){
                setdata((data)=>{return (data ?  [...data,...res.data] : res.data)})
            }else{
                setdata(res.data)
            }
            setShowload(res.length === 10)
            if(setLoading){
                setLoading(false)
            }
            if(done){
                done()
            }
            
        })
        
    })
}, 1000);

export default getdata;