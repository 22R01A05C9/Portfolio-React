import "./projects.css"
import Card from "./card/card"
import Title from "../title/title"
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
        <div className="projects" id="projects">
            <Title title={"Projects"} desc={"List of My Recent Projects"} />
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
    )
}

export default Projects