import Header from "./header-component/header";
import Scroll from "./scroll-component/scroll";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../../components/loading/loading"

const Product = lazy(() => import("./product-component/product"))
const Main = lazy(() => import("./main-body-component/main-body"))
function Minview(props) {
    const [showscroll, setshowscroll] = useState(false)
    useEffect(() => {
        window.onscroll = () => {
            setshowscroll(window.scrollY > 250)
        }
    })
    const scroll = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return (
        <>
            <Header />
            <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Main data={props.data} />} />
                        <Route path="/product/:id" element={<Product data={props.data} />} />
                    </Routes>
            </Suspense>
            {showscroll && <Scroll onclick={scroll}></Scroll>}
        </>
    )
}

export default Minview;