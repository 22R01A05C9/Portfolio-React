import Header from "../../components/header/header"
import "./sms.css"
import Smsradio from "../../components/smsradio/smsradio"
import { useEffect, useRef, useState } from "react"
import {  toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { AES } from "crypto-js"
import SmsStatus from "../../components/smsstatus/status"
function Sms(){
    const [sent,setSent] = useState(0)
    const [total,setTotal] = useState(0)
    useEffect(()=>{
        document.title = "Sms Bomber"
        window.addEventListener("beforeunload",()=>{
            socket.close(1000,"refresh")
        })
    },[])
    const smsref = useRef()
    const update = (data)=>{
        let msg = data.message
        if(msg === "processing"){
            let doc = smsref.current
            setTotal(parseInt(doc.querySelector(".times input").value))

        }else if(msg === "1"){
            setSent(sent => sent+1)
        }else if(msg === "completed"){
            // handel complete
        }
    }

    const submit=(document)=>{
        document.querySelector(".status").style.display = "block"
        document.querySelector(".number input").disabled = true
        document.querySelector(".times input").disabled = true
        document.querySelector(".submit button").style.display = "none"
        document.querySelector(".speed").style.display = "none"
        let inputs = document.querySelector(".userinputs")
        let number = inputs.querySelector(".number input").value
        let times = inputs.querySelector(".times input").value
        let speed = inputs.querySelector(".speed .radio .active .radiobtn").textContent
        if(speed === "Slow") speed = 700
        else if(speed === "Medium") speed = 500
        else speed = 300
        let data = {number:number, times:times, speed:speed}
        let token = AES.encrypt(JSON.stringify(data) , import.meta.env.VITE_SMS_API_KEY).toString()
        let socket = new WebSocket("/ws")
        socket.addEventListener("open",()=>{
            socket.send(JSON.stringify({token:token}))
        })
        socket.addEventListener("message",(event)=>{
            let res = JSON.parse(event.data)
            if(res?.error){
                let problem = res.problem
                if(problem==="number"){
                    let number = document.querySelector(".number")
                    toast.error("Please Enter Valid Number!!",{
                        theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                        autoClose: 2000,
                        closeOnClick: true,
                        draggable: true
                    })
                    number.classList.add("error")
                }else if(problem==="times"){
                    toast.error("Please Enter Valid Times!!",{
                        theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                        autoClose: 2000,
                        closeOnClick: true,
                        draggable: true
                    })
                    let times = document.querySelector(".times")
                    times.classList.add("error")
                    
                }else{
                    let number = document.querySelector(".number")
                    toast.error(res.message,{
                        theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                        autoClose: 2000,
                        closeOnClick: true,
                        draggable: true
                    })
                    number.classList.add("error")
                }
                socket.close()
                return ;
            }else{
                update(res)
            }
        })
    }
    const inp = (e)=>{
        if(e.target.value.trim() === ""){
            e.target.parentNode.classList.remove("filled")
        }else{
            e.target.parentNode.classList.add("filled")
        }
        e.target.parentNode.classList.remove("error")
    }
    const verify = ()=>{
        let document = smsref.current
        let number = document.querySelector(".number")
        let times = document.querySelector(".times")
        if(number.querySelector("input").value.trim() === ""){
            toast.error("Please Enter Number!!",{
                theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                autoClose: 2000,
                closeOnClick: true,
                draggable: true
            })
            number.classList.add("error")
            return ;
        }else if(number.querySelector("input").value.trim().length !== 10){
            toast.error("Please Enter Valid Number!!",{
                theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                autoClose: 2000,
                closeOnClick: true,
                draggable: true
            })
            number.classList.add("error")
            return ;
        }else if(number.querySelector("input").value.trim() === "8639625032"){
            toast.error("Number Blocked!!",{
                theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                autoClose: 2000,
                closeOnClick: true,
                draggable: true
            })
            number.classList.add("error")
        }
        if(times.querySelector("input").value.trim() === ""){
            toast.error("Please Enter TImes!!",{
                theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                autoClose: 2000,
                closeOnClick: true,
                draggable: true
            })
            times.classList.add("error")
            return ;
        }else if(parseInt(times.querySelector("input").value) > 150){
            toast.error("Please Enter Less Than 150 Times",{
                theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                autoClose: 2000,
                closeOnClick: true,
                draggable: true
            })
            times.classList.add("error")
            return ;
        }
        submit(document)
    }
    return(
        <div className="sms" ref={smsref}>
            <Header ext="/" active="projects"/>
            <div className="smsbody">
                <h2>SMS Bomber</h2>
                <p className="sinfo">Please Enter The Below Details To Start Bombing</p>
                <div className="userinputs">
                    <div className="number">
                        <input onInput={inp} type="number" id="number" />
                        <label htmlFor="number">Number</label>
                    </div>
                    <div className="times">
                        <input type="number" id="times" onInput={inp} onKeyDown={(e)=>{
                            if(e.key === "Enter"){
                                verify()
                            }
                        }}/>
                        <label htmlFor="times">SMS's</label>
                    </div>
                    <div className="speed">
                        <p>Select Speed</p>
                        <Smsradio options={['Slow','Medium','Fast']} />
                    </div>
                </div>
                <div className="submit">
                    <button onClick={verify}>Submit</button>
                </div>
                <div className="status">
                    {
                        sent>0 ? <SmsStatus sent={sent} total={total}/> : <p>Connecting To Server Please Wait...<br /> Usually Takes 0-20 Seconds</p>
                    }
                    
                    
                </div>
            </div>
        </div>
    )
}


export default Sms