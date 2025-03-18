import "./mainbody.css"
import Upload from "../upload/upload";
import Download from "../download/download";
import { useEffect, useRef } from "react";
function Mainbody({ showchoose, choose }) {
    const ip = useRef(null)
    useEffect(() => {
        const func = async ()=>{
            const data = await fetch("https://api64.ipify.org?format=json")
            const json = await data.json()
            ip.current = json.ip
        }
        func()
    }, [])
    return (
        <div className="files">
            {showchoose == true ? <Download choose={choose} ip={ip} /> : <Download choose={"Download"} ip={ip} />}
            {showchoose == true ? <Upload choose={choose} ip={ip} /> : <Upload choose={"Upload"} ip={ip} />}
        </div>
    )
}

export default Mainbody;