import Header from "../header/header";
import Options from "../options/options";
import Output from "../output/output";
import { useState, useRef, useEffect } from "react";
import getdata from "../../helper/getdata";
import { useParams } from "react-router-dom";
import "./main.css"

function Main() {
    const {troll} = useParams()
    const [data, setData] = useState(null);
    const [searchby, setSearchby] = useState("Name");
    const [year, setYear] = useState("ALL");
    const [branch, setBranch] = useState("ALL");
    const [showload, setShowload] = useState(true);
    const nameRef = useRef(null);
    const rollRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const loadmore = (done) => {
        let input = null
        if(searchby === "Name") input = nameRef.current
        else input = rollRef.current
        getdata(input, searchby, branch, year, Math.ceil(data?.length / 10) + 1, setData, setShowload, true, done)
    }
    useEffect(()=>{
        if(troll){
            rollRef.current.value = troll
            setSearchby("Roll")
        }
    },[rollRef])
    

    return (
        <div className="cmritsearch">
            <Header />
            <div className="main">
                <Options setdata={setData} searchby={searchby} branch={branch} year={year} rollRef={rollRef} nameRef={nameRef} setYear={setYear} setBranch={setBranch} setSearchby={setSearchby} setShowload={setShowload} setLoading={setLoading}/>
                {data && <Output data={data} loadmore={loadmore} showload={showload} loading={loading}/>}
            </div>
        </div>
    );
}

export default Main;