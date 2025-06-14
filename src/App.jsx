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
const NotFound = lazy(() => import("./notfound/notfound"))
const Url = lazy(() => import("./url/url"))


function App() {

	return (
		<HelmetProvider>
			<Suspense fallback={<Loading />}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Mainpage />} />
						<Route path="/sms" element={<Sms />} />
						<Route path="/mines/*" element={<Mines />} />
						<Route path="/shopping/*" element={<Shopping />} />
						<Route path="/files" element={<Files />} />
						<Route path="/url/*" element={<Url />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</Suspense>
		</HelmetProvider>
	);
}

export default App;
