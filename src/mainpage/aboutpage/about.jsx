import "./about.css"
import Title from "../title/title"
function About() {
    return (
        <div className="about" id="about">
            <Title title={"About"} desc={"Short Description About Me"} />
            <div className="adesc">
                <p>
                    I'm Saiteja, A Passionate MERN Stack Developer With A Strong Foundation In Web Development. I Specialize In Building Modern, Scalable, And Efficient Web Applications Using MongoDB, Express.js, React, And Node.js. My Expertise Extends To Front-End Technologies Like HTML, CSS, And JavaScript, Allowing Me To Create Seamless User Interfaces With A Focus On Responsiveness And Performance.
                </p>
                <p>
                    On The Backend, I Develop Robust APIs And Manage Databases Efficiently, Ensuring Secure And Optimized Data Flow. I Also Have Experience With Python, Which Helps Me Explore Areas Like Automation And Backend Logic. My Problem-Solving Mindset Pushes Me To Tackle Challenges And Continuously Refine My Development Skills.                </p>
                <p>
                    I Enjoy Learning New Technologies And Staying Up To Date With Industry Trends. Whether It's Optimizing Performance, Debugging Issues, Or Implementing New Features, I Strive To Create High-Quality Digital Experiences.                </p>
            </div>
        </div>
    )
}

export default About