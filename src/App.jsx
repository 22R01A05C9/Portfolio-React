import Mainpage from "./pages/mainpage/mainpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./pages/loadingpage/loading";
import { lazy, Suspense } from "react";

const Sms = lazy(()=>import("./pages/smspage/sms"))

function App() {

	return (
		<Suspense fallback={<Loading/>}>
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
