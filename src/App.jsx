import Footer from "./components/footer/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/loading/loading";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import "./App.css"
const Sms = lazy(() => import("./sms/sms"))
const Mainpage = lazy(() => import("./mainpage/mainpage"))
const Mines = lazy(() => import("./mines/mines"))
const Shopping = lazy(() => import("./shopping/shopping"))
const Files = lazy(() => import("./files/files"))
function App() {

	return (
		<HelmetProvider>
			<div className="app">
				<Suspense fallback={<Loading />}>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Mainpage />} />
							<Route path="/sms" element={<Sms />} />
							<Route path="/mines/*" element={<Mines />} />
							<Route path="/shopping/*" element={<Shopping />} />
							<Route path="/files" element={<Files />} />
						</Routes>
					</BrowserRouter>
				</Suspense>
				<Footer />
			</div>
		</HelmetProvider>
	);
}

export default App;
