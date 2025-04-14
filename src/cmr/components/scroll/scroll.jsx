import "./scroll.css"
import { useState } from "react"

function Scroll(){
    const [scroll, setScroll] = useState(false)
    window.addEventListener("scroll", function(){
        setScroll(window.scrollY > 300)
    })
    const stt = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return(
            scroll ? 
            <div onClick={stt} className="scroll">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/></svg>
            </div> : 
            null
    )
}

export default Scroll;  