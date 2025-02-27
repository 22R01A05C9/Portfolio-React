import "./title.css"

function Title({title,desc}){
    return(
        <>
            <h2>{title}</h2>
            <p className="sh">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" /></svg>
                {desc}
            </p>
        </>
    )
}

export default Title