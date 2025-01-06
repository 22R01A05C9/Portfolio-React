import SwitchTheme from "../switchtheme/switchtheme";
import "./header.css"
function Header() {
	return (
		<header>
			<div className="mainlogo">
				<a href="/">Sai Teja</a>
			</div>
			<div className="mainnav">
				<ul>
					<li><a className="activea" href="#home">Home</a></li>
					<li><a href="#about">About</a></li>
					<li><a href="#projects">Projects</a></li>
					<li><a href="#socials">Socials</a></li>
					<li><a href="#contact">Contact</a></li>
				</ul>
			</div>
			<SwitchTheme />
		</header>
	)
}

export default Header;