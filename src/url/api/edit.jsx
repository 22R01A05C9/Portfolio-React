import { toast } from "react-toastify"
import fdd from "./fetchdashdata"
function EditAPI(lRef, code, setEdit, setLoading, setData) {
    let token = localStorage.getItem("urltoken")
    let long = lRef.current.value
    if (!long) {
        toast.error("Please Enter A Long URL");
        lRef.current.focus();
        return;
    }
    let urlregexp = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[^\s]*)?$/i;
    if (!urlregexp.test(long)) {
        toast.error("Please Enter A Valid Long URL");
        lRef.current.focus();
        return;
    }
    fetch("/api/url/edit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, long, code })
    }).then(res => res.json()).then(data => {
        if (data.error) {
            setEdit(null)
            toast.error(data.message)
        } else {
            toast.success(data.message)
            fdd(setLoading, setData)
        }
    })
}

export default EditAPI