import Mainpage from "./pages/mainpage/mainpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./pages/loadingpage/loading";
import { lazy, Suspense } from "react";
import {ToastContainer} from "react-toastify"
import "./App.css"
import Feedback from "./components/feedback/feedback";

const Sms = lazy(()=>import("./pages/smspage/sms"))



function App() {

	return (
		<Suspense fallback={<Loading/>}>
			<ToastContainer />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Mainpage />} />
					<Route path="/sms" element={<Sms />} />
					<Route path="/feedback" element={<Feedback />} />
				</Routes>
			</BrowserRouter>
		</Suspense>
		
	);
}

export default App;
