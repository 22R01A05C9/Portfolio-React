import styles from "./maincomponent.module.css"
import Optionpanel from "../optionpanel-component/optionpanel-component"
import Images from "../images-component/images-component"
import { useState } from "react"

function Mainbody(props) {
    const [color, setcolor] = useState("All")
    const [price, setprice] = useState("All")
    let newdata = []
    let newprice = price;
    switch (newprice) {
        case "Low": newprice = " 10, 000";
            break;
        case "Medium": newprice = " 50, 000";
            break;
        case "High": newprice = " 1, 00, 000";
            break;
    }
    if (color === "All" && price == "All") {
        newdata = props.data
    } else {
        if (price === "All") {
            props.data.forEach((value) => {
                if (value.color === color) {
                    newdata.push(value)
                }
            });
        } else if (color === "All") {
            props.data.forEach((value) => {
                if (value.price.substring(1,) === newprice) {
                    newdata.push(value)
                }
            });
        } else {
            props.data.forEach((value) => {
                if ((value.price.substring(1,) === newprice) && (value.color === color)) {
                    newdata.push(value)
                }
            });
        }
    }

    return (
        <div className={styles.mainbody}>
            <Optionpanel className={styles.option} color={color} setcolor={setcolor} price={price} setprice={setprice} />
            <hr></hr>
            <Images data={newdata} className={styles.images} />
        </div>
    )
}

export default Mainbody