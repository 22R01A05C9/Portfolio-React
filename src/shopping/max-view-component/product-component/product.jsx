import { useState } from 'react'
import { useParams } from "react-router-dom"
import styles from "./product.module.css"
import { useEffect, useRef } from "react"
import Popup from "./popup-component/popup"

function Product({ data }) {
    const optref = useRef()
    function active(obj) {
        optref.current.querySelectorAll("button").forEach((value) => {
            value.classList.remove(styles.active)
        })
        obj.classList.add(styles.active)
    }
    useEffect(() => {
        optref.current.querySelectorAll("button").forEach((value) => {
            value.addEventListener("click", () => {
                active(value)
            })
        })

    })
    const { id } = useParams()
    const newdata = data[id]

    const [bag, setbag] = useState(false)
    const [fav, setfav] = useState(false)
    const [bagmsg, setbagmsg] = useState("Added to Bag!")
    const [favmsg, setfavmsg] = useState("Added to Favourite!")

    const addbag = () => {
        if (bagmsg == "Added to Bag!") {
            setbag(true)
        } else {
            setbag(true)
        }
    }
    const closebag = () => {
        setbag(false)
        setbagmsg("Already Added To Bag!")
    }
    const closefav = () => {
        setfav(false)
        setfavmsg("Already Added To Favourite!")
    }
    const addfav = () => {
        if (favmsg == "Added to Favourite!") {
            setfav(true)
        } else {
            setfav(true)
        }
    }

    return (
        <div className={styles.product}>
            <img className={styles.prodimg} src={newdata.image} alt="" />
            <div className={styles.details}>
                <h1 className={styles.title}>{newdata.name}</h1>
                <p className={styles.color}>{newdata.color} Color</p>
                <p className={styles.price}>MRP {" " + newdata.price}</p>
                <p className={styles.tax}>incl. of taxes<br />(Also includes all applicable duties)</p>
                <div className={styles.sizes}>
                    <p>Select Size</p>
                    <div ref={optref} className={styles.allsizes}>
                        <button>UK 6</button>
                        <button>UK 6.5</button>
                        <button>UK 7</button>
                        <button>UK 7.5</button>
                        <button>UK 8</button>
                        <button>UK 8.5</button>
                        <button>UK 9</button>
                        <button>UK 9.5</button>
                        <button>UK 10</button>
                        <button>UK 10.5</button>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button onClick={addbag} className={styles.bag}>Add to Bag</button>
                    <button onClick={addfav} className={styles.fav}>Favourite
                        {
                            favmsg !== "Already Added To Favourite!" ? <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" /></svg>
                        }</button>
                </div>
                <div className={styles.description}>
                    <p>New colours and fresh textures update this all-time favourite without losing its classic look and familiar feel. Made from premium materials and pumped full of comfortable Nike Air cushioning, it features subtle details that make it a staple sneaker with a modern expression.</p>
                    <div className={styles.spe}>
                        <p><strong>Colour Shown:</strong>  {newdata.color}</p>
                        <p><strong>Style: </strong>FQ7720-002</p>
                        <p><strong>Country of Origin:</strong> Vietnam</p>
                    </div>

                </div>

            </div>
            {bag && <Popup message={bagmsg} close={closebag} />}
            {fav && <Popup message={favmsg} close={closefav} />}
        </div>
    )
}

export default Product