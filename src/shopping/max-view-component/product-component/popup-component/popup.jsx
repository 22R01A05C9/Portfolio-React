import styles from "./popup.module.css"

function Popup({ message, close }) {
    let heigh = document.body.offsetHeight
    const sty = {
        height: `${heigh + 250}px`
    }
    return (
        <div className={styles.popup} onClick={close} style={sty}>
            <div className={styles.info}>
                <svg onClick={close} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /> </svg>
                <div className={styles.data}>
                    <h3>Alert</h3>
                    <p className={styles.heading}>{message}</p>
                </div>

            </div>

        </div >
    )
}

export default Popup;