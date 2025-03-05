import { useEffect } from "react"
import styles from "./header.module.css"

function Header() {
    useEffect(() => {
        document.querySelector(".menu").addEventListener("click", (e) => {
            document.querySelector(".menu").classList.add(styles.disnone)
            document.querySelector(".close").classList.remove(styles.disnone)
            document.querySelector("nav").style.display = "block";
            setTimeout(() => {
                document.querySelector("nav").style.opacity = "1";
            }, 200);
        })

        document.querySelector(".close").addEventListener("click", (e) => {
            document.querySelector("nav").classList.add(styles.fadeout)
            setTimeout(() => {
                document.querySelector("nav").classList.remove(styles.fadeout)
                document.querySelector(".menu").classList.remove(styles.disnone)
                document.querySelector(".close").classList.add(styles.disnone)
                document.querySelector("nav").style.display = "none";
                document.querySelector("nav").style.opacity = "0";
            }, 200)


        })
    })
    return (
        <header className={styles.minheader}>
            <div className={styles.subpart}>
                <div className={styles.head}>
                    <a href="/shopping"><img className={styles.brandlogo} src="/shoppingimages/brandlogo.png" alt="Website Logo" /></a>
                    <svg className="menu" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                    <svg className={"close " + styles.disnone} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </div>
                <nav className={styles.minnav} >
                    <ul>
                        <li className={styles.hoveractive}><a href="/shopping">Home</a></li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Track Order</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header