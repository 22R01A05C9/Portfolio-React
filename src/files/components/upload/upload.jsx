import "./upload.css"
import Img from "./img"
import Status from "../status/status"
import Options from "./options"
import Submit from "./submit"
import Output from "./output"
import { useRef, useState } from "react"
import submit from "../../hooks/upload"

function Upload({ choose, ip }) {
    const fileRef = useRef(null)
    const ccRef = useRef(null)
    const dodRef = useRef(null)
    const [file, setFile] = useState(null)
    const [ccodestatus, setccodestatus] = useState(false)
    const [uper, setuper] = useState("0%")
    const [uploading, setUploading] = useState(false)
    const [output, setOutput] = useState(null)
    const submitwrapper = () => {
        submit(ccRef, dodRef, file, ip, setuper, setUploading, setccodestatus, setOutput, ccodestatus)
    }
    return (
        <div className={"upload" + (choose === "Upload" ? "" : " disnone")}>
            <Img fileref={fileRef} setFile={setFile} less={file !== null} setper={setuper} uploading={uploading} setuploading={setUploading} setoutput={setOutput} />
            {
                file === null ? file :
                    <div className="file">
                        <Status file={file} per={uper} />
                        {uploading || output !== null ? null : <Options setccodestatus={setccodestatus} ccref={ccRef} dodref={dodRef} ccodestatus={ccodestatus} ip={ip}/>}
                        {uploading || output !== null ? null : <Submit submit={submitwrapper} />}
                        {output === null ? output : <Output data={output} />}
                    </div>
            }


        </div>
    )
}

export default Upload