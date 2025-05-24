import { useEffect } from "react";
import "./notfound.css"

function NotFound(){
    useEffect(() => {
        document.title = "404 Not Found";
        document.querySelector("html").style.colorScheme="light"
    })
    return(
        <div className="notfound">
            <p className="m404"><strong>404</strong> Not Found</p>
            <p className="gotohome">Click <a href="/">here</a> to go back to the homepage.</p>
            <p>This Website is Developed By <strong>Saiteja</strong></p>

        </div>
    )
}

export default NotFound;