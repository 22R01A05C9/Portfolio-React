import "./header.css"
import SwitchTheme from "../../../components/switchtheme/switchtheme";
function Header() {
    return (
        <header>
            <h3><a href="/files">File Share</a></h3>
            <div className="wrapper">
                <SwitchTheme />
            </div>
        </header>
    )
}


export default Header;