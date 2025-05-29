import { toast } from "react-toastify";

const submit = (longRef, codeRef, btn, setOutput) => {
    let long = longRef.current.value;
    let code = codeRef.current.value;
    setOutput(null)
    if (!long) {
        toast.error("Please Enter A Long URL");
        longRef.current.focus();
        return;
    }
    let urlregexp = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[^\s]*)?$/i;
    if (!urlregexp.test(long)) {
        toast.error("Please Enter A Valid Long URL");
        longRef.current.focus();
        return;
    }
    if (!code) {
        toast.error("Please Enter The Code")
        codeRef.current.focus();
        return;
    }
    let customregexp = /^[a-zA-Z0-9]{1,15}$/
    if (!customregexp.test(code)) {
        toast.error("Code Must be 1-15 alphanumeric characters");
        codeRef.current.focus();
        return;
    }
    if ("https://url.saiteja.site/" + code === long) {
        toast.error("Code cannot be same as Long URL");
        codeRef.current.focus();
        return;
    }
    btn.disabled = true;
    btn.innerText = "";
    btn.classList.add("fetching")
    let token = localStorage.getItem("urltoken");
    fetch("/api/url/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            long: long,
            code: code,
            token: token ? token : ""
        })
    }).then(res => res.json()).then((data) => {
        if (data.error) {
            toast.error(data.message);
            if(data.message === "Code Already Exists"){
                codeRef.current.focus()
            }
        } else {
            toast.success(data.message);
            longRef.current.value = "";
            codeRef.current.value = "";
            setOutput(data.url);
            localStorage.setItem("urltoken", data.token);
        }
        btn.disabled = false;
        btn.innerText = "Create";
        btn.classList.remove("fetching");
        return;
    })
}

export default submit