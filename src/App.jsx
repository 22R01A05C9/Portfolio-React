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
const Cmr = lazy(() => import("./cmr/cmr"))
const NotFound = lazy(() => import("./notfound/notfound"))
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
							<Route path="/cmr/*" element={<Cmr />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				</Suspense>
		</HelmetProvider>
	);
}

export default App;
