import SwitchTheme from "../switchtheme/switchtheme";
import "./header.css"
function Header({ext, active}) {
	return (
		<header>
			<div className="mainlogo">
				<a href="/">Sai Teja</a>
			</div>
			<div className="mainnav">
				<ul>
					{
						["home","about","projects","socials","contact"].map((link)=>{
							return <li key={link}><a className={link===active?"activea":""}href={ext+link}>{link.charAt(0).toUpperCase()+link.slice(1)}</a></li>
						})
					}
				</ul>
			</div>
			<SwitchTheme />
		</header>
	)
}

export default Header;