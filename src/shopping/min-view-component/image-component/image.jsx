import styles from "./image.module.css";

function Image({ image, name, price, color, index }) {
    const redir = () => {
        window.location.href = "/shopping/product/" + index;
    }
    return (
        <div className={styles.item} onClick={redir}>
            <img src={image} alt="Product image"></img>
            <hr></hr>
            <p className={styles.title}>{name}</p>
            <p className={styles.price}> &#x20B9;{price}</p>
            <p className={styles.color}>{color} Color</p>
            <button className={styles.buy} type="button"><a href={"/shopping/product/" + index}>Buy Now</a></button>
        </div>

    )
}

export default Image;