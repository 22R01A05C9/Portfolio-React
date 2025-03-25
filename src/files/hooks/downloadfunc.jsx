import { AES } from "crypto-js";
import Toast from "../helpers/toast";

const download = (inputRefs, buttonRef, setdper, setdfile, ip) => {
    let code = ""
    inputRefs.current.forEach((input) => {
        code += input.value
    })
    let exp = /^[0-9]{4}$/;
    if (!exp.test(code)) {
        Toast("Invalid Code!", "warn", localStorage.getItem("theme") || "dark")
        return;
    }
    let data = JSON.stringify({ id: code })
    let token = AES.encrypt(data, import.meta.env.VITE_FILES_API_KEY).toString()
    fetch("/api/files/download", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Forwarded-For": ip.current
        },
        body: JSON.stringify({ token: token })
    }).then((res) => {
        return res.json()
    }).then((data) => {
        if (data.status) {
            setdfile(data)
            inputRefs.current.forEach((input) => {
                input.disabled = true
            })
            buttonRef.current.disabled = true
            let redirect = data.redirect
            redirect = window.location.origin + "/api" + redirect
            let xhr = new XMLHttpRequest()
            xhr.open("GET", redirect)
            xhr.responseType = "blob"
            xhr.setRequestHeader("X-Forwarded-For", ip.current)
            xhr.send()
            xhr.onprogress = (e) => {
                let per = parseInt(e.loaded / e.total * 100).toString()
                setdper(`${per}%`)
            }
            xhr.onload = () => {
                setTimeout(() => {
                    setdper("0%")
                    setdfile(false)
                    inputRefs.current[1].disabled = false
                    inputRefs.current[1].focus()
                    buttonRef.current.disabled = false
                    if (localStorage.getItem("filesfeedback") === null)
                        document.querySelector(".mainfeedback").classList.remove("disnone")
                }, 3000);
                let headers = xhr.getResponseHeader("Content-Type")
                if (headers.includes("application/json")) {
                    Toast("Some Error Occured!!", "error", localStorage.getItem("theme") || "dark")
                    return
                }
                let blob = xhr.response
                let url = URL.createObjectURL(blob)
                let a = document.createElement("a")
                a.href = url
                a.download = data.name
                a.click()
                Toast("File Downloaded Successfully", "success", localStorage.getItem("theme") || "dark")
                inputRefs.current.forEach((input) => {
                    if (input) input.value = ""
                })
            }
        } else {
            Toast(data.message, "error", localStorage.getItem("theme") || "dark")
        }
    })
}

const Downloadfunc = (inputRefs, buttonRef, setdper, setdfile, ip) => {
    if(ip.current === null) {
        fetch("https://ip.ageerasaiteja.workers.dev").
        then(res => res.json()).
        then(json => {
            ip.current = json.ip
            download(inputRefs, buttonRef, setdper, setdfile, ip)
        })
    }else{
        download(inputRefs, buttonRef, setdper, setdfile, ip)
    }
}

export default Downloadfunc