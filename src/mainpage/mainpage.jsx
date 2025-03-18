import Header from "../components/header/header"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import {scroller} from "react-scroll"
import Home from "./homepage/homepage"
import About from "./aboutpage/about"
import Skills from "./skillspage/skills"
import Projects from "./projectspage/projects"
import Contact from "./contactpage/contact"
import Links from "./linkspage/links"


function Mainpage(){
	const location = useLocation();
	useEffect(()=>{
		document.title = "Ageera Saiteja";
		document.querySelector("link[rel~='icon']").href="/logo.svg"
		document.querySelector("meta[name='title']").setAttribute("content", "Ageera Saiteja")
		document.querySelector("meta[property='og:title']").setAttribute("content", "Ageera Saiteja")
		document.querySelector("meta[name='description']").setAttribute("content", "I Am Ageera Saitja, Explore My Portfolio Showcasing React, MERN Stack Projects, And Web Development Skills. Check Out My Latest Projects, Resume, and Skills!")
		document.querySelector("meta[property='og:description']").setAttribute("content", "I Am Ageera Saitja, Explore My Portfolio Showcasing React, MERN Stack Projects, And Web Development Skills. Check Out My Latest Projects, Resume, and Skills!")
		document.querySelector("meta[name='keywords']").setAttribute("content", "React, JavaScript, Web Development, Ageera Saiteja, Saiteja Ageera, Saiteja, Ageera, Portfolio")
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
			<Home />
			<About />
			<Skills />
			<Projects />
			<Links />
			<Contact />
        </>
    )
}

export default Mainpage