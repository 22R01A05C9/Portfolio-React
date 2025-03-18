import { useRef } from "react";
import { ccodeinp, verifycc, clickedoptions } from "../../hooks/options";

function Options({ setccodestatus, ccref, dodref, ccodestatus, ip }) {
    const optionsRef = useRef(null)

    return (
        <div className="options">
            <div className="optionstitle show" onClick={(e) => { clickedoptions(e, optionsRef) }} ref={optionsRef}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="var(--back)"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>
                <p>Options</p>
            </div>
            <div className="ccode" ref={ccref}>
                <div className="chead">
                    <input type="checkbox" id="ccodeo" />
                    <label htmlFor="ccodeo">Click To Set Custom Code Of 4 Digits</label>
                </div>
                <div className="cbody">
                    <input onInput={(e) => { ccodeinp(e, setccodestatus) }} type="number" id="ccode" placeholder="Enter Custom Code" />
                    <button onClick={verifycc.bind(null, ccref, setccodestatus, ip)} disabled={ccodestatus}>Verify</button>
                </div>
            </div>
            <div className="dod" ref={dodref}>
                <input type="checkbox" id="dod" />
                <label htmlFor="dod">Check To Download Only Once</label>
            </div>
        </div>
    )
}

export default Options