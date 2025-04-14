import Main from "./components/main/main";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./cmr.css"
function Cmr() {
	return (
		<>
			<Helmet>
				<title>CMRIT Search</title>
				<link rel="apple-touch-icon" sizes="180x180" href="/cmfiles/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/cmfiles/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/cmfiles/favicon-16x16.png" />
				<link rel="manifest" href="/cmfiles/site.webmanifest" />
				<meta name="title" content="CMRIT Search" />
				<meta property="og:title" content="CMRIT Search" />
				<meta name="description" content="Search and view student profiles from CMR Institute of Technology by name, roll number, branch, or year of joining. Instantly find CMRIT students with photos using my smart and responsive search tool." />
				<meta property="og:description" content="Search and view student profiles from CMR Institute of Technology by name, roll number, branch, or year of joining. Instantly find CMRIT students with photos using my smart and responsive search tool." />
				<meta name="keywords" content="CMRIT student directory, CMRIT search, CMRIT student photos, CMRIT roll number search, CMRIT branch wise students, CMRIT year of joining, CMRIT student info, cmrit photo search, cmrit database, CMR Institute of Technology directory" />
			</Helmet>
			<div className="cmr">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/:troll" element={<Main />} />
				</Routes>
			</div>
		</>

	);
}

export default Cmr;