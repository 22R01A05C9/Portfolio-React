import Footer from "./components/footer/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/loading/loading";
import { lazy, Suspense } from "react";
import "./App.css"
const Sms = lazy(()=>import("./sms/sms"))
const Mainpage = lazy(()=>import("./mainpage/mainpage"))


function App() {

	return (
		<div className="app">
			<Suspense fallback={<Loading/>}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Mainpage />} />
						<Route path="/sms" element={<Sms />} />
					</Routes>
				</BrowserRouter>
			</Suspense>
			<Footer />
		</div>
		
		
	);
}

export default App;
