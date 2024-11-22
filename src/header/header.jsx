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
					<li><a href="#">Home</a></li>
					<li><a href="#">About</a></li>
					<li><a href="#">Projects</a></li>
					<li><a href="#">Social</a></li>
					<li><a href="#">Contact</a></li>
				</ul>
			</div>
			<SwitchTheme />
		</header>
	)
}

export default Header;