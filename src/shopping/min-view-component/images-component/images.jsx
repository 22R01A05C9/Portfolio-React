import styles from "./images.module.css"
import Image from "../image-component/image";
function Images({ data }) {
    return (
        <div className={styles.items}>
            {
                data.map((item) => {
                    return (
                        <Image key={item.index} index={item.index} image={item.image} name={item.name} price={item.price.substring(1,)} color={item.color}></Image>)
                })
            }
        </div>
    )


}

export default Images;