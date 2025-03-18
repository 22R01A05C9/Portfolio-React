import { useEffect, useRef } from "react"
import "./choose.css"

function Choose({ setchoose }) {
    const chooseRef = useRef(null)
    useEffect(() => {
        chooseRef.current.querySelectorAll("p").forEach((p) => {
            p.addEventListener("click", () => {
                chooseRef.current.querySelector(".active").classList.remove("active")
                p.classList.add("active")
                setchoose(p.innerText)
            })
        })
    }, [])

    return (
        <div className="choose" ref={chooseRef} >
            <p className="active">Download</p>
            <p>Upload</p>
        </div>
    )
}

export default Choose