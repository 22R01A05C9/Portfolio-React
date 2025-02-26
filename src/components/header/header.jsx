import { useRef } from "react";
import { Link } from "react-scroll"
import { useNavigate } from "react-router-dom";
import SwitchTheme from "../switchtheme/switchtheme";
import "./header.css"


function Header({ext, active}) {
	const headeref = useRef()
	const navigate = useNavigate()
	const open =(e)=>{
		headeref.current.querySelector(".mainnav").style.display = "block";
		headeref.current.querySelector(".close").style.display = "block";
		headeref.current.querySelector(".transparent").classList.add("menu")
		headeref.current.querySelectorAll("svg")[2].style.display = "none";
		e.stopPropagation()
		document.querySelector(":root").addEventListener("click",close)
		document.querySelectorAll(".mainnav ul li ").forEach((link)=>{
			link.addEventListener("click",close)
		})
	}
	const close =()=>{
		let mainnav = headeref.current.querySelector(".mainnav");
		headeref.current.querySelector(".transparent").classList.remove("menu")
		mainnav.classList.add("closenav")
		setTimeout(()=>{
			mainnav.style.display = "none";
			mainnav.classList.remove("closenav")
		},300)
		
		headeref.current.querySelector(".close").style.display = "none";
		headeref.current.querySelectorAll("svg")[2].style.display = "block";
		document.querySelector(":root").removeEventListener("click",close)
		document.querySelectorAll(".mainnav ul li ").forEach((link)=>{
			link.removeEventListener("click",()=>{
				console.log("yes");
				close()
			})
		})
	}

	const handelnavigation = (e)=>{
		navigate("/",{state:{scrollto:e.target.innerHTML.toLowerCase()}})
	}
	return (
		<header ref={headeref}>
			<div className="mainlogo">
				<a href="/">Sai Teja</a>
			</div>
			<div className="mainnav">
				<ul>
					{
						ext ? 
						["home","about","projects","socials","contact"].map((link)=>{
							return <li key={link}><a className={link===active?"activea":""} onClick={handelnavigation}>{link.charAt(0).toUpperCase()+link.slice(1)}</a></li>
						}) : 
						["home","about","projects","links","contact"].map((link)=>{
							return <li key={link}>
								<Link
									to={link}
									smooth={"easeInOutQuad"} 
									offset={-90}
									duration={100} 
									spy={true}     
									activeClass="activea"
									>{link.charAt(0).toUpperCase()+link.slice(1)}</Link>
								</li>
						})
					}
				</ul>
			</div>
			<SwitchTheme />
			<svg className="menu" xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="30px" fill="#5f6368" onClick={open}><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
			<svg className="close" xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
			<span className="transparent"></span>
		</header>
	)
}

export default Header;