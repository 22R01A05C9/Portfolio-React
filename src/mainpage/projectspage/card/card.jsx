import "./card.css"

function Card(props){
    return(
        <div className="card">
            <img src={props.item.img} alt="" />
            <div className="cardinfo">
                <h3 className="title">
                    <a href={props.item.live}>{props.item.title}</a>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>
                </h3>
                <p className="techstack"><strong>Tech Stack:</strong> {props.item.techstack}</p>
                <p className="description">{props.item.description}</p>
            </div>
            <div className="links">
                <a href={props.item.live}>Live Demo</a>
                <a href={props.item.code}>Code Link</a>
            </div>
        </div>
    )
}

export default Card