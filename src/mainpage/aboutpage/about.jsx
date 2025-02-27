import "./about.css"

function About() {
    return (
        <div className="about" id="about">
            <h2>About</h2>
            <p className="sh">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" /></svg>
                Short Description About Me
            </p>
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