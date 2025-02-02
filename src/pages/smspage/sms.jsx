import Header from "../../components/header/header"
import "./sms.css"
import Smsradio from "../../components/smsradio/smsradio"
import { useRef } from "react"
import {  toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { AES } from "crypto-js"

function Sms(){
    const submit=(document)=>{
        let inputs = document.querySelector(".userinputs")
        let number = inputs.querySelector(".number input").value
        let times = inputs.querySelector(".times input").value
        let speed = inputs.querySelector(".speed .radio .active .radiobtn").textContent
        if(speed === "Slow") speed = 1500
        else if(speed === "Medium") speed = 1000
        else speed = 500
        let data = {number:number, times:times, speed:speed}
        let token = AES.encrypt(JSON.stringify(data) , import.meta.env.VITE_SMS_API_KEY).toString()
        let socket = new WebSocket("http://localhost:5000")
        socket.addEventListener("open",()=>{
            socket.send(JSON.stringify({token:token}))
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
    const smsref = useRef()
    return(
        <div className="sms" ref={smsref}>
            <Header ext="/" />
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
            </div>
        </div>
    )
}


export default Sms