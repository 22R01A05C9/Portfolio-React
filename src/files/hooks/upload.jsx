import Toast from "../helpers/toast"
const uploaded = (res, ccinput, ccchecked, dod, setccodestatus, setOutput, setUploading) => {
    Toast("File Uploaded Succesfully!!", "success", localStorage.getItem("theme") || "dark")
    ccinput.value = ""
    ccinput.classList.remove("green")
    ccinput.classList.remove("red")
    ccchecked.checked = false
    dod.checked = false
    setccodestatus(false)
    let link = window.location.origin + "/api/files/download/" + res.str
    let id = res.id.toString()
    while(id.length != 4){
        id = "0" + id
    }
    setOutput({ id: id, link: link })
    setUploading(false)
}
const Submitfnc = (ccRef, dodRef, file, ip, setuper, setUploading, setccodestatus, setOutput, ccodestatus) => {
    let ccinput = ccRef.current.querySelector("#ccode")
    let ccchecked = ccRef.current.querySelector("#ccodeo")
    let dod = dodRef.current.querySelector("#dod")
    let size = parseFloat(file.size / 1000000).toFixed(2).toString() + " MB"
    if (file === null) {
        Toast("No File Selected", "error", localStorage.getItem("theme") || "dark")
        return;
    }
    if (ccchecked.checked && !ccodestatus) {
        Toast("Custom Code Not Verified !!", "error", localStorage.getItem("theme") || "dark")
        ccinput.focus()
        ccinput.classList.add("red")
        return;
    }
    let formdata = new FormData()
    formdata.append("file", file)
    formdata.append("customstatus", ccchecked.checked)
    formdata.append("deleteondownload", dod.checked)
    formdata.append("size", size)
    if (ccchecked.checked) formdata.append("customid", ccinput.value)
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/files/upload")
    xhr.setRequestHeader("X-Forwarded-For", ip.current)
    xhr.upload.addEventListener("progress", (e) => {
        let per = parseInt(e.loaded / e.total * 100)
        setuper(`${per}%`)
    })
    xhr.send(formdata)
    setUploading(true)
    xhr.onload = () => {
        let contenttype = xhr.getResponseHeader("Content-Type")
        if (contenttype.includes("application/json")) {
            let res = JSON.parse(xhr.response)
            if (res.status) {
                uploaded(res, ccinput, ccchecked, dod, setccodestatus, setOutput, setUploading)
            } else {
                Toast(res.message, "error", localStorage.getItem("theme") || "dark")
            }
        } else {
            Toast("Please Try Again!!", "error", localStorage.getItem("theme") || "dark")
        }
    }
}

const submit = Submitfnc

export default submit