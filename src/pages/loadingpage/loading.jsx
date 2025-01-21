import "./loading.css"
import { useEffect } from "react";

function Loading(){
    useEffect(() => {
            if (localStorage.getItem("theme") === "dark") {
                document.querySelector(":root").style.colorScheme = "dark"
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