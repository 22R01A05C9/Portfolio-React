import "./mobilecard.css"
import Card from "../card/card"
import { useState, useEffect } from "react"

function Mobilecard({data}){
    const [card,setCard] = useState(0)
    const setcard = (e)=>{
        if(e.target.classList.contains("left") && !e.target.classList.contains("dim")){
            setCard((card)=>card-1)
        }else if(e.target.classList.contains("right") && !e.target.classList.contains("dim")){
            setCard((card)=>card+1)
        }
        
    }
    useEffect(()=>{
        if(card == 0){
            document.querySelector(".left").classList.add("dim")
        }else{
            document.querySelector(".left").classList.remove("dim")
        } 
        if(card == data.length-1){
            document.querySelector(".right").classList.add("dim")
        }else{
            document.querySelector(".right").classList.remove("dim")
        } 
    },[card])
    return(
        <div className="mobilecard">
            <svg onClick={setcard} className="left" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
            <Card item={data[card]}/>
            <svg onClick={setcard} className="right" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
        </div>
    )
}

export default Mobilecard