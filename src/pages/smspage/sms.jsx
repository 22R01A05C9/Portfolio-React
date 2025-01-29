import Header from "../../components/header/header"
import "./sms.css"
import Smsradio from "../../components/smsradio/smsradio"
import { useRef } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'



function Sms(){
    const inp = (e)=>{
        if(e.target.value.trim() === ""){
            e.target.parentNode.classList.remove("filled")
        }else{
            e.target.parentNode.classList.add("filled")
        }
    }
    const verify = ()=>{
        let document = smsref.current
        let number = document.querySelector(".number")
        if(number.querySelector("input").value === ""){
            toast.error("Please Enter Number!!",{
                theme:(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"),
                autoClose: 2000,
                closeOnClick: true,
                draggable: true
            })
            number.classList.add("error")
        }


    }
    const smsref = useRef()
    return(
        <div className="sms" ref={smsref}>
            <ToastContainer />
            <Header ext="/" />
            <div className="smsbody">
                <h2>SMS Bomber</h2>
                <p className="sinfo">Please Enter The Below Details To Start Bombing</p>
                <div className="userinputs">
                    <div className="number">
                        <input type="number" id="number" onInput={inp}/>
                        <label htmlFor="number">Number</label>
                    </div>
                    <div className="times">
                        <input type="number" id="times" onInput={inp}/>
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