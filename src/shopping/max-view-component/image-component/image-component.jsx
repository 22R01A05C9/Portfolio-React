import styles from "./image-component.module.css";

function Image({ image, name, price, color, index, redir }) {
    return (
        <div className={styles.item} onClick={redir}>
            <img src={image} alt="Product image"></img>
            <hr></hr>
            <p className={styles.title}>{name}</p>
            <p className={styles.price}> &#x20B9;{price}</p>
            <p className={styles.color}>{color} Color</p>
            <a className={styles.buy} href={'/shopping/product/' + index}>Buy Now</a>
        </div>

    )
}

export default Image;