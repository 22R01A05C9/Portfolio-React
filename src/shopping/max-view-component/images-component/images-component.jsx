import Image from "../image-component/image-component";
import styles from "./images-component.module.css";
import React from "react";
function Images({ data }) {
    const redirect = (e) => {
        if (e.target.querySelector("a")) {
            window.location.href = e.target.querySelector("a").href;
        }
        else {
            window.location.href = e.target.parentNode.querySelector("a").href
        }
    }
    return (
        <div className={styles.items}>
            {
                data.map((item) => {
                    return (
                        <Image key={item.index} index={item.index} image={item.image} name={item.name} price={item.price.substring(1,)} color={item.color} redir={redirect}></Image>)
                })
            }
        </div>
    )
}

export default Images;