import Header from "../components/header/header"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import Home from "./homepage/homepage"
import Projects from "./projectspage/projects"
import Contact from "./contactpage/contact"

function Mainpage(){
    useEffect(()=>{
		let observer = new IntersectionObserver((entries)=>{
			entries.forEach((entry)=>{
				if(entry.isIntersecting){
					document.querySelectorAll(".mainnav ul li a").forEach((element)=>{
						element.classList.remove("activea")
					})
					document.querySelector('a[href="#'+entry.target.id+'"]').classList.add("activea")
				}
			})
		},{threshold:0.65})
		observer.observe(document.querySelector("#projects"))
		observer.observe(document.querySelector("#contact"))
		
	},[])

    return(
        <>
			<ToastContainer />
            <Header ext="#" active="home"/>
			<Projects />
			<Contact />
        </>
    )
}

export default Mainpage