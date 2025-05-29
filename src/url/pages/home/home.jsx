import "./home.css"
import Input from "../../components/input/input";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import submit from "../../api/homeapi";
import { QRCodeCanvas } from "qrcode.react";
function Title() {
    return (
        <div className="title">
            <h1>Create Short Urls</h1>
            <p>Enter your long URL below to create a short URL.</p>
        </div>
    );
}

function Tabs() {
    return (
        <div className="tabs">
            <a href="/url" className="active">Create</a>
            <a href="/url/dashboard">Dashboard</a>
        </div>
    );
}

function Inputs({ setOutput }) {
    const [longRef, codeRef, buttonRef] = [useRef(), useRef(), useRef()];
    const clickedbtn = () => {
        submit(longRef, codeRef, buttonRef.current, setOutput);
    }
    const onkeydown = (e) => {
        if (e.key === "Enter") {
            if (e.target.id === "long") {
                codeRef.current.focus();
                return;
            }
            e.preventDefault();
            submit(longRef, codeRef, buttonRef.current, setOutput);
        }
    }
    return (
        <div className="inputs">
            <Input type="url" label="Paste Long Url" placeholder="https://www....." id={"long"} ref={longRef} okd={onkeydown} />
            <Input type="text" label="Enter Custom Code" placeholder="ex: shortcode" id={"code"} ref={codeRef} okd={onkeydown} />
            <button onClick={clickedbtn} ref={buttonRef}>Create</button>
        </div>
    )
}

const fallbackcopy = (url) => {
    let textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

const copyurltoclipboard = (url) => {
    if (navigator.clipboard !== undefined)
        navigator.clipboard.writeText(url)
    else fallbackcopy(url);
    toast.success("Copied to clipboard");
}

function Qrprompt({ url, set }) {
    const qrRef = useRef(null)
    const downloadqr = () => {
        let canvas = qrRef.current.querySelector("canvas")
        let durl = canvas.toDataURL("image/png")
        let a = document.createElement("a")
        a.href = durl
        a.download = "shorturl.png"
        a.click()
    }
    const clickdiv = (e)=>{
        if(e.target.classList.contains("qrprompt")){
            set(null)
        }
    }
    return (
        <div className="qrprompt" onClick={clickdiv}>
            <div className="prompt" ref={qrRef}>
                <QRCodeCanvas value={url} size={160}/>
                <div className="btns">
                    <button onClick={downloadqr}>Download</button>
                    <button onClick={()=>set(null)}>Close</button>
                </div>
            </div>
        </div>
    )
}

function Qrcode({ output }) {
    const [qrdata, setqrdata] = useState(null)
    return (
        <div className="qrcode">
            <button onClick={() => setqrdata(output)}>Show QR Code</button>
            {qrdata ? <Qrprompt url={qrdata} set={setqrdata}/> : null}
        </div>
    )
}

function Output({ url }) {
    return (
        <div className="output">
            <div className="url">
                <p>{url}</p>
                <div className="copy" onClick={copyurltoclipboard.bind(this, url)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" /></svg>
                    <div className="hover"></div>
                </div>
            </div>
            <Qrcode output={url} />
        </div>
    )
}

function Container() {
    const [output, setOutput] = useState("");
    return (
        <div className="container">
            <Tabs />
            <Inputs setOutput={setOutput} />
            {output && <Output url={output} />}
        </div>
    )
}


function Home() {
    return (
        <div className="home">
            <Title />
            <Container />
        </div>
    );
}


export default Home;