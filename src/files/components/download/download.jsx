import "./download.css"
import Cinput from "./cinput";
import Status from "../status/status";
import { useCallback, useEffect, useRef, useState } from "react";
import Downloadfunc from "../../hooks/downloadfunc";
function Download({ choose, ip }) {
    const buttonRef = useRef(null)
    const inputRefs = useRef([])
    const [dper, setdper] = useState("0%")
    const [dfile, setdfile] = useState(false)
    const download = useCallback(() => Downloadfunc(inputRefs, buttonRef, setdper, setdfile, ip), [])
    useEffect(() => {
        buttonRef.current.addEventListener("click", download)
        inputRefs.current[1].focus()
    }, [])

    return (
        <div className={"download" + (choose === "Download" ? "" : " disnone")}>
            <h3>Download</h3>
            <p className="desc">Enter Code To Download File</p>
            <Cinput submit={download} buttonref={buttonRef} inputref={inputRefs} file={dfile} />
            <div className="submit">
                <button disabled ref={buttonRef}>Download</button>
            </div>
            {dfile ? <Status file={dfile} per={dper} /> : null}
        </div>
    )
}

export default Download