import Loading from "../../components/loading/loading";
import Input from "../../components/input/input";
import { useState, useEffect, useRef } from "react";
import "./dashboard.css";
import fdd from "../../api/fetchdashdata";
import delurl from "../../api/deleteurl";
import EditAPI from "../../api/edit";
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

    return (
        <div className="card">
            <p><strong>Short Code: </strong>{code}</p>
            <p><strong>Long Url: </strong><a href={lhref} target="_blank">{long}</a></p>
            <p><strong>Redirects: </strong>{count}</p>
            <div className="dbtn">
                <button onClick={() => setPrompt(code)}>Delete</button>
                <button onClick={() => setEdit(code)}>Edit</button>
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

function Edit({ code, setEdit, setLoading, setData }) {
    const lRef = useRef(null)
    return (
        <div className="prompt">
            <div className="area">
                <h3>Edit Code <strong>{code}</strong></h3>
                <div className="einp">
                    <Input type={"text"} label={"Custom Code"} id={"code"} value={code} dis={true} />
                    <Input type={"url"} label={"New Long URL"} id={"long"} placeholder={"ex: https://www.google.com"} ref={lRef} />
                </div>
                <div className="dbtn">
                    <button onClick={() => setEdit(null)}>Close</button>
                    <button onClick={EditAPI.bind(this, lRef, code, setEdit, setLoading, setData)}>Edit</button>
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
            {edit ? <Edit code={edit} setEdit={setEdit} setLoading={setLoading} setData={setData} /> : null}
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