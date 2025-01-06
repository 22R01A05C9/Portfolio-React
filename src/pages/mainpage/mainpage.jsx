import Header from "../../components/header/header"
import { useEffect } from "react"


function Mainpage(){
    useEffect(()=>{
		let observer = new IntersectionObserver((entries)=>{
			entries.forEach((entry)=>{
				if(entry.isIntersecting){
					document.querySelectorAll(".mainnav ul li a").forEach((element)=>{
						element.classList.remove("activea")
					})
					document.querySelector('a[href="#'+entry.target.id+']"').classList.add("activea")
				}
			})
		},{threshold:0.65})

		
	},[])

    return(
        <>
            <Header ext="#" />
        </>
    )
}

export default Mainpage