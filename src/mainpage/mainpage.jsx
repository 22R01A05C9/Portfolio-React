import Header from "../components/header/header"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import {scroller} from "react-scroll"
import { Helmet } from "react-helmet-async"
import Home from "./homepage/homepage"
import About from "./aboutpage/about"
import Skills from "./skillspage/skills"
import Projects from "./projectspage/projects"
import Contact from "./contactpage/contact"
import Links from "./linkspage/links"


function Mainpage(){
	const location = useLocation();
	useEffect(()=>{
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
		<Helmet>
			<title>Ageera Saiteja</title>
			<link rel="icon" href="/logo.svg" />
			<meta name="title" content="Ageera Saiteja" />
			<meta property="og:title" content="Ageera Saiteja" />
			<meta name="description" content="I Am Ageera Saiteja, Explore My Portfolio Showcasing React, MERN Stack Projects, And Web Development Skills. Check Out My Latest Projects, Resume, and Skills!" />
			<meta property="og:description" content="I Am Ageera Saiteja, Explore My Portfolio Showcasing React, MERN Stack Projects, And Web Development Skills. Check Out My Latest Projects, Resume, and Skills!" />
			<meta name="keywords" content="React, JavaScript, Web Development, Ageera Saiteja, Saiteja Ageera, Saiteja, Ageera, Portfolio" />
		</Helmet>
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