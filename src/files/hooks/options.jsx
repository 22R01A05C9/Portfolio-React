import Toast from "../helpers/toast"
const ccodeinp = (e, setccodestatus) => {
    e.target.classList.remove("red")
    e.target.classList.remove("green")
    setccodestatus(false)
    let val = e.target.value;
    if (val.length > 4) {
        e.target.value = val.slice(0, 4)
    }
}

const verifycc = (ccref, setccodestatus, ip) => {
    let ccode = ccref.current.querySelector("#ccode");
    let regexp = /^[0-9]{4}$/;
    let code = ccode.value;
    if (!regexp.test(code)) {
        Toast("Invalid Code", "error", localStorage.getItem("theme") || "dark")
        ccode.classList.add("red")
        return;
    }
    fetch("/api/files/cverify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Requested-For": ip.current
        },
        body: JSON.stringify({
            ccode: code
        })
    }).then(res => res.json()).then((res) => {
        setccodestatus(res.status)
        if (res.status === false) {
            Toast(res.message, "warn", localStorage.getItem("theme") || "dark");
            ccode.classList.add("red")
            ccode.classList.remove("green")
        } else {
            Toast(res.message, "success", localStorage.getItem("theme") || "dark")
            ccode.classList.remove("red")
            ccode.classList.add("green")
        }
    })
}

const clickedoptions = (e, optionsRef) => {
    let options = optionsRef.current, svg = options.querySelector("svg");
    if (options.classList.contains("show")) {
        options.classList.remove("show")
        svg.classList.add("normal")
    } else {
        options.classList.add("show")
        svg.classList.remove("normal")
    }
}
export { ccodeinp, verifycc, clickedoptions }