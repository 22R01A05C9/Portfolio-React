import Mainpage from "./mainpage/mainpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/loading/loading";
import { lazy, Suspense } from "react";
import {ToastContainer} from "react-toastify"
import "./App.css"
const Sms = lazy(()=>import("./sms/sms"))



function App() {

	return (
		<Suspense fallback={<Loading/>}>
			<ToastContainer />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Mainpage />} />
					<Route path="/sms" element={<Sms />} />
				</Routes>
			</BrowserRouter>
		</Suspense>
		
	);
}

export default App;
