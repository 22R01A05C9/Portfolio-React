import { toast } from "react-toastify"
import "./contact.css"

function Contact() {
    const input = (e) =>{
        e.target.parentNode.classList.toggle("filled", e.target.value.trim() !== "")
        e.target.classList.remove("error")
    }
    const submit = (name,email,message)=>{
        let data = {name:name.value,email:email.value,message:message.value}
        fetch("/api/contact",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then(res=>res.json()).then(data=>{
            if(data.error === false){
                toast.success(data.message,{
                    theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                    autoClose: 2000,
                    closeOnClick: true,
                    draggable: true
                })
                name.value = ""
                email.value = ""
                message.value = ""
                document.querySelectorAll(".cform div").forEach(e=>{
                    e.classList.remove("filled")
                    e.querySelector("input").classList.remove("error")
                })
            }else{
                toast.warn(data.message,{
                    theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                    autoClose: 2000,
                    closeOnClick: true,
                    draggable: true
                })
            }
        })
    }
    const verify = ()=>{
        let name = document.getElementById("name")
        let email = document.getElementById("email")
        let message = document.querySelector(".message textarea")
        if(name.value.trim() === ""){
            toast.error("Name Is Required",{
                theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                autoClose: 2000,
                closeOnClick: true,
                draggable: true
            })
            name.classList.add("error")
            return;
        }
        if(email.value.trim() === ""){
            toast.error("Email Is Required",{
                theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                autoClose: 2000,
                closeOnClick: true,
                draggable: true
            })
            email.classList.add("error")
            return;
        }
        let exp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!exp.test(email.value.trim())){
            toast.error("Email Is Invalid",{
                theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                autoClose: 2000,
                closeOnClick: true,
                draggable: true
            })
            email.classList.add("error")
            return;
        }
        if(message.value.trim() === ""){
            toast.error("Message Is Required",{
                theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                autoClose: 2000,
                closeOnClick: true,
                draggable: true
            })
            message.classList.add("error")
            return;
        }
        submit(name,email,message)
    }
    return (
        <div className="contact" id="contact">
            <h2>Contact</h2>
            <p className="sh">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
                    Fill The Below Form To Contact Me
                </p>
                <div className="cform">
                    <div className="name">
                        <input type="text" id="name" autoComplete="name" onInput={input}/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="email">
                        <input type="text" id="email" autoComplete="email" onInput={input}/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="message">
                        <textarea name="message" placeholder="Message"></textarea>
                    </div>
                    <button type="button" onClick={verify}>Submit</button>
                </div>
        </div>
    )
}

export default Contact