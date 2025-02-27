import "./homepage.css"
import profile from "../../assets/profile.webp"

function Home(){
    return (
        <div className="home" id="home">
            <div className="wrapper">
                <div className="img">
                    <img src={profile} alt="a coder in anime style" />
                </div>
                <div className="info">
                    <div className="title">
                        <h3>I'm</h3>     
                        <h3 >Ageera Saiteja</h3>  
                    </div>
                    <div className="desc">
                        <p>A MERN Stack Developer Passionate About Building Web Applications And Learning New Technologies. I Have Experience In React, Node.js, And MongoDB. I Enjoy Solving Problems And Creating User-Friendly Applications. Check Out My Projects!</p>
                    </div>
                    <div className="buttons">
                        <a href="/resume.pdf" download={true}>Resume</a>
                        <a href="https://github.com/22R01A05C9">Github</a>                    

                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default Home