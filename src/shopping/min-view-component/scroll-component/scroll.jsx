import styles from "./scroll.module.css"

function Scroll(props) {
    return (
        <div className={styles.scroll} onClick={props.onclick}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" ><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" /></svg>
        </div>
    )
}
export default Scroll;