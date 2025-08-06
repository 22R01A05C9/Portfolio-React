import { Suspense, lazy, useEffect, useRef, useState } from "react"
import "./files.css"
import Header from "./components/header/header"
import Mainbody from "./components/main/mainbody"
import Loading from "../components/loading/loading"
import Toast from "./helpers/toast"
import Footer from "../components/footer/footer"
import { Helmet } from "react-helmet-async"
import { ToastContainer } from "react-toastify"
const Choose = lazy(() => import("./components/choose/choose"))
const Feedback = lazy(() => import("../components/feedback/feedback"))

function Files() {
	const [showchoose, setshowchoose] = useState(window.matchMedia("(max-width: 749px)").matches)
	const [choose, setchoose] = useState("Download")
	useEffect(() => {
		window.addEventListener("resize", () => {
			setshowchoose(window.matchMedia("(max-width: 749px)").matches)
		})
		const error = new URLSearchParams(window.location.search).get("error")
		if (error === "File Not Found") {
			setTimeout(() => Toast("File Not Found!", "error", localStorage.getItem("theme") || "dark"), 500)
		}
	}, [])
	return (
		<div className="filesapp">
			<Helmet>
				<title>File Share</title>
				<link rel="icon" href="/fileslogo.svg" />
				<meta name="title" content="File Share" />
				<meta property="og:title" content="File Share" />
				<meta name="description" content="Upload and share files easily with a unique code system. Files are stored securely and auto-delete after 2 hours. Try now!" />
				<meta property="og:description" content="Upload and share files easily with a unique code system. Files are stored securely and auto-delete after 2 hours. Try now!" />
				<meta name="keywords" content="file share, file sharing, share files, file sharing website, file share website" />
			</Helmet>
			<Suspense fallback={<Loading />}>
				<div className="fileshare">
					<div className="main">
						<Header />
						{showchoose ? <Choose setchoose={setchoose} /> : null}
						<Mainbody showchoose={showchoose} choose={choose} />
					</div>
				</div>
				{localStorage.getItem("filesfeedback") === null ? <Feedback application="files" /> : null}
				<ToastContainer />
				<Footer />
			</Suspense>
		</div>


	)
}

export default Files