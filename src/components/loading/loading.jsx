import "./loading.css"
import { useEffect } from "react";

function Loading(){
    useEffect(() => {
        let root = document.querySelector(":root");
        if(window.location.pathname.startsWith("/shopping")){
            root.style.colorScheme = "light"
        }else{
            root.style.colorScheme = localStorage.getItem("theme") || "dark"
        }
        }, []);
    return(
        <div className="loading">
            <div className="text">
                <span>Please</span>
                <span>Wait...</span>
            </div>
        </div>
    )
}


export default Loading