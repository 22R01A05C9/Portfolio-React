import Loading from "../../components/loading/loading";
import Input from "../../components/input/input";
import { useState, useEffect, useRef } from "react";
import "./dashboard.css";
import fdd from "../../api/fetchdashdata";
import delurl from "../../api/deleteurl";
import EditAPI from "../../api/edit";
import ctc from "../../helpers/ctc"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Title() {
    return (
        <div className="title">
            <h1>Dashboard</h1>
            <p>Track Your Short Urls</p>
        </div>
    );
}

function Nodata() {
    return (
        <div className="nodata">
            <p>Please Create A Short Url To See The Dashboard</p>
            <a href="/url">Create Now</a>
        </div>
    )
}

function Prompt({ code, setPrompt, setData, setLoading }) {
    const handelyes = () => {
        delurl(code, setLoading, setData)
    }
    return (
        <div className="prompt">
            <div className="area">
                <h4>Confirm Delete</h4>
                <p>Are You Sure To Delete Code <strong>{code}</strong></p>
                <div className="opt">
                    <button onClick={handelyes}>Yes</button>
                    <button onClick={() => { setPrompt(null) }}>No</button>
                </div>
            </div>
        </div>
    )
}

function Card({ code, long, count, setPrompt, setEdit }) {
    let lhref = long.startsWith("http") ? long : "https://" + long;
    let shorturl = "https://url.saiteja.site/" + code
    return (
        <div className="card">
            <p><strong>Short Code: </strong>{code}</p>
            <p><strong>Long Url: </strong><a href={lhref} target="_blank">{long.slice(0, 20) + (long.length > 20 ? "...." : "")}</a></p>
            <p className="short">
                <strong>Short Url: </strong>{shorturl.slice(8, 30) + (shorturl.length > 30 ? "...." : "")}
                <i className="cicon">
                    <svg onClick={ctc.bind(this, shorturl)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" /></svg>
                    <span className="hov"></span>
                </i>

            </p>
            <p><strong>Redirects: </strong>{count}</p>
            <div className="dbtn">
                <button onClick={() => setPrompt(code)}>Delete</button>
                <button onClick={() => setEdit({ code, long })}>Edit</button>
            </div>
        </div>
    );
}

function Details({ data, setPrompt, setEdit }) {
    return (
        <div className="details">
            <h2>Details</h2>
            <div className="cards">
                {
                    data.map((item, index) => (
                        <Card key={index} code={item.code} long={item.long} count={item.count} setPrompt={setPrompt} setEdit={setEdit} />
                    ))
                }
            </div>
        </div>
    );
}

function Edit({ edit, setEdit, setLoading, setData }) {
    const lRef = useRef(null)
    const okd = (e) => {
        if (e.key === "Enter") {
            EditAPI(lRef, edit.code, setEdit, setLoading, setData)
        }
    }
    return (
        <div className="prompt">
            <div className="area">
                <h3>Edit Code <strong>{edit.code}</strong></h3>
                <div className="einp">
                    <Input type={"text"} label={"Custom Code"} id={"code"} value={edit.code} dis={true} />
                    <Input type={"url"} label={"New Long URL"} id={"long"} placeholder={"ex: https://www.google.com"} ref={lRef} okd={okd} value={edit.long} />
                </div>
                <div className="dbtn">
                    <button onClick={() => setEdit(null)}>Close</button>
                    <button onClick={EditAPI.bind(this, lRef, edit.code, setEdit, setLoading, setData)}>Edit</button>
                </div>
            </div>
        </div>
    )
}

function Data({ data, isPhone, setLoading, setData }) {
    const modifycode = (code) => {
        if (code.length > 4) {
            return code.slice(0, 4) + "...";
        }
        return code;
    }
    let [height, width] = isPhone ? [300, "90%"] : [350, "70%"];
    const [prompt, setPrompt] = useState(null)
    const [edit, setEdit] = useState(null)
    let chartsdata = []
    data.forEach(item => {
        chartsdata.push({
            code: modifycode(item.code),
            count: item.count
        });
    });
    chartsdata = chartsdata.slice(0, isPhone ? 5 : 10);
    return (
        <>
            <div className="charts">
                <ResponsiveContainer width={width} height={height}>
                    <BarChart width={500} height={300} data={chartsdata}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="code" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#ff6b5f" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <Details data={data} setPrompt={setPrompt} setEdit={setEdit} />
            {prompt ? <Prompt code={prompt} setPrompt={setPrompt} setLoading={setLoading} setData={setData} /> : null}
            {edit ? <Edit edit={edit} setEdit={setEdit} setLoading={setLoading} setData={setData} /> : null}
        </>

    )
}



function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [isPhone, setIsPhone] = useState(window.matchMedia("(max-width: 800px)").matches);
    useEffect(() => {
        fdd(setLoading, setData)
        window.matchMedia("(max-width: 800px)").addEventListener("change", (e) => {
            setIsPhone(e.matches);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="dashboard">
            <Title />
            {data ? <Data data={data} isPhone={isPhone} setLoading={setLoading} setData={setData} /> : <Nodata />}
        </div>
    );
}

export default Dashboard;