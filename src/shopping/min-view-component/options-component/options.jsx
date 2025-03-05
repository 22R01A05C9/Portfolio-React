import styles from "./options.module.css"
import { useRef, useEffect } from "react";


function Options({ options, data, setdata }) {
    const activeref = useRef(null);
    const optionref = useRef(null);
    const seteventlisteners = () => {
        const allli = optionref.current.querySelectorAll("ul li");
        allli.forEach((value) => {
            value.removeEventListener("click", hoveroptions);
            value.addEventListener("click", setproperties)
        })
    }

    const setproperties = (e) => {
        optionref.current.classList.remove(styles.hover);
        activeref.current.classList.remove(styles.active);
        e.target.classList.add(styles.active);
        e.target.removeEventListener("click", setproperties);
        e.target.onclick = hoveroptions;
        setdata(e.target.innerHTML);
    }

    const hoveroptions = () => {
        optionref.current.className = styles.hover;
        seteventlisteners();
    }
    useEffect(() => {
        activeref.current.className = styles.active
        activeref.current.addEventListener("click", hoveroptions)
    })
    return (
        <div className={styles.container}>
            <div className={styles.select}>
                <div ref={optionref} className={styles.options}>
                    <ul>
                        {
                            options.map((value) => {
                                return <li key={value} ref={value === data ? activeref : null}>{value}</li>
                            })
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Options;