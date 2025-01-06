import Mainpage from "./mainpage/mainpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Mainpage />} />
			</Routes>
		</BrowserRouter>
		
	);
}

export default App;
