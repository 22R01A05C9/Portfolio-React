
import Navbar from "./navbar-component/navbar-component";
import { Routes, Route } from "react-router-dom";
import Loading from "../../components/loading/loading";
import { lazy, Suspense } from "react";

const Mainbody = lazy(() => import("./main-component/main-component"));
const Product = lazy(() => import("./product-component/product"));


export default function Maxview(props) {
    return (
        <Suspense fallback={<Loading />}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Mainbody data={props.data} />} />
                    <Route path="/product/:id" element={<Product data={props.data} />} />
                </Routes>
        </Suspense>
    );
}