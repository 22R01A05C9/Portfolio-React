import { toast } from "react-toastify"
import fdd from "./fetchdashdata"
function delurl(short, setLoading, setData){
    let token = localStorage.getItem("urltoken")
    fetch("/api/url/deleteurl",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({token,code:short})
    }).then(res=>res.json()).then(data => {
        if(data.error){
            toast.error(data.message)
        }else{
            toast.success(data.message)
        }
        fdd(setLoading, setData)
    })
}

export default delurl