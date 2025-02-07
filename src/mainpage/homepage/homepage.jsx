import "./homepage.css"
import profile from "../../assets/profile.jpg"

function Home(){
    return (
        <div className="home" id="home">
            <div className="homecontent">
                <img src={profile} alt="a coder in anime style" />
                <div className="info">
                    <h3>I'm</h3>
                    <h3>Ageera Saiteja</h3>
                </div>
            </div>
            
        </div>
    )
}

export default Home