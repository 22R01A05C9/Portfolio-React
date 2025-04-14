import Searchby from "./searchby";
import Year from "./year";
import Branch from "./branch";
import Input from "./input";
import { useEffect } from "react";
import getdata from "../../helper/getdata";
import "./options.css"

function Options({ searchby, branch, year, setdata, rollRef, nameRef, setYear, setBranch, setSearchby, setShowload, setLoading }) {
    useEffect(() => {
        if (year === "2023") setBranch("ALL")
    }, [year])
    const wrapper = () => {
        let input = null
        if(searchby === "Name") input = nameRef.current
        else input = rollRef.current
        getdata(input, searchby, branch, year, 1, setdata, setShowload, false, null, setLoading)
    }
    useEffect(() => {
        wrapper()
    }, [branch, year, searchby])
    return (
        <div className="options">
            <Year year={year} set={setYear} />
            <Branch branch={branch} set={setBranch} year={year} />
            <Searchby searchby={searchby} set={setSearchby} />
            <Input rollref={rollRef} nameref={nameRef} searchby={searchby} oninp={() => { wrapper() }} />
        </div>
    )
}

export default Options;