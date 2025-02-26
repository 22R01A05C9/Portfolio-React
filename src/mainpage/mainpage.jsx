import Header from "../components/header/header"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import {scroller} from "react-scroll"
import Home from "./homepage/homepage"
import Projects from "./projectspage/projects"
import Contact from "./contactpage/contact"
import Links from "./linkspage/links"
function Mainpage(){
	const location = useLocation();
	useEffect(()=>{
		document.title = "Ageera Saiteja";
		document.querySelector("link[rel~='icon']").href="/logo.svg"
		if(location.state?.scrollto){
			scroller.scrollTo(location.state.scrollto, {
				duration: 100,
				smooth: "easeInOutQuart",
			});
			location.state.scrollto = null
		}
	},[location])

    return(
        <>
			<ToastContainer />
            <Header ext={false}/>
			<Projects />
			<Links />
			<Contact />
        </>
    )
}

export default Mainpage