import styles from "./option-panel.module.css"
import Options from "../options-component/options";
function Optionpanel(props) {
    return (
        <div className={styles.options}>
            <p>Choose Options</p>
            <div className={styles.coloroption}>
                <p>Select Color</p>
                <Options options={["All", "Black", "Blue"]} data={props.color} setdata={props.setcolor} />
            </div>
            <div className={styles.priceoption}>
                <p>Select Price</p>
                <Options options={["All", "High", "Medium", "Low"]} data={props.price} setdata={props.setprice} />
            </div>
        </div>
    )
}

export default Optionpanel;