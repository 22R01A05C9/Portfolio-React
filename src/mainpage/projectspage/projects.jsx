import "./projects.css"
import Card from "./card/card"
function Projects(){
    const data = [
        {   
            img:"/mines.webp",
            title:"Mines Game",
            techstack:"ReactJS, NodeJS, ExpressJS, MongoDB",
            description:"A Simple Mines Game Where There are 16 Block And Few Mines, The Main Aim Is To Unlock The Blocks Which Doesn't Contain Mine",
            live:"/mines",
            code:"https://github.com/22R01A05C9/minesgame"
        },
        {   
            img:"/sms.webp",
            title:"SMS Bomber",
            techstack:"ReactJS, NodeJS, ExpressJS",
            description:"A Simple SMS Bomber Which Can Send Multiple Messages To A Single Number Just Made For Fun To Annoy Friends And Family", 
            live:"/sms",
            code:"https://github.com/22R01A05C9/Portfolio-React"
        }
    ]
    return(
        <div className="temp">
            <div className="projects" id="projects">
                <h2>Projects</h2>
                <p className="sh">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
                    List of my recent Projects
                </p>
                <div className="cards">
                    {
                        data.map((item,index)=>{
                            return(
                                <Card key={index} item={item} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Projects