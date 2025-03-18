import Toast from "../../helpers/toast";
import React from "react";
const Cinput = React.memo(({ submit, buttonref, inputref, file }) => {
    const paste = (e) => {
        if (file) {
            e.preventDefault()
            return;
        }
        let data = e.clipboardData.getData("text");
        let exp = /^[0-9]{4}$/;
        if (exp.test(data)) {
            inputref.current.forEach((input, index) => {
                input.value = data[index - 1]
                if (index <= 3) {
                    input.disabled = true
                    inputref.current[index + 1].disabled = false
                    inputref.current[index + 1].focus()
                }
            })
        } else {
            Toast("Pasting Invalid Code", "warn", localStorage.getItem("theme") || "dark")
            e.preventDefault()
        }
    }
    const inp = (e) => {
        if (file) {
            e.target.value = ""
            e.target.disabled = true
            Toast("File Is Being Downloaded!", "warn", localStorage.getItem("theme") || "dark")
            e.preventDefault()
            return;
        }
        buttonref.current.disabled = true
        let value = e.target.value.trim()
        let length = value.length
        if (length == 0) return;
        if (length > 1) {
            e.target.value = value.slice(length - 1, length)
        }
        let next = e.target.nextSibling
        if (next) {
            e.target.disabled = true
            next.disabled = false
            next.focus()
        } else {
            buttonref.current.removeAttribute("disabled")
        }
    }
    const kdown = (e) => {
        if (file) {
            e.target.value = ""
            e.target.disabled = true
            Toast("File Is Being Downloaded!", "warn", localStorage.getItem("theme") || "dark")
            e.preventDefault()
            return;
        }
        if (e.key == "Backspace") {
            buttonref.current.disabled = true
            if (e.target.value) {
                e.target.value = "";
                return;
            }
            let prev = e.target.previousSibling
            if (prev) {
                e.target.disabled = true
                prev.disabled = false
                prev.focus()
            }
        } else if (e.key == "Enter" && buttonref.current.disabled == false) {
            submit()
        }
    }
    return (
        <div className="dinput" >
            {[1, 2, 3, 4].map((ind) => {
                return (
                    <input key={ind} type="number" ref={(ele) => (inputref.current[ind] = ele)} name={`i${ind}`} onInput={inp} onKeyDown={kdown} disabled={ind > 1 || file != false} onPaste={paste} />
                )
            })}
        </div>
    )
})

export default Cinput