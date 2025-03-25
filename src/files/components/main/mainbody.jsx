import "./mainbody.css"
import Upload from "../upload/upload";
import Download from "../download/download";
import { useRef } from "react";
function Mainbody({ showchoose, choose }) {
    const ip = useRef(null)
    return (
        <div className="files">
            {showchoose == true ? <Download choose={choose} ip={ip} /> : <Download choose={"Download"} ip={ip} />}
            {showchoose == true ? <Upload choose={choose} ip={ip} /> : <Upload choose={"Upload"} ip={ip} />}
        </div>
    )
}

export default Mainbody;