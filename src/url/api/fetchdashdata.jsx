import { toast } from "react-toastify";

function fdd(setLoading, setData) {
    setLoading(true);
    let token = localStorage.getItem("urltoken");
    if (!token) {
        setLoading(false);
        return;
    }
    fetch("/api/url/getdashdata", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
    }).then(res => res.json()).then(data => {
        if (data.error) {
            toast.error(data.message)
            localStorage.removeItem("urltoken")
        } else {
            let lis = data.urls;
            if (lis.length === 0) {
                setData(null)
            } else {
                lis.sort((a, b) => b.count - a.count);
                setData(lis);
            }
        }
        setLoading(false);
    })
}

export default fdd;