import { useRef, useState } from "react";
import "./feedback.css"

function Star({ i, clickedstar, rating }) {
    return (
        <div className={"star ss" + i} onClick={clickedstar}>
            {i > rating && <svg className="s1" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg>}
            {i <= rating && <svg className="s2" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" /></svg>}
        </div>
    )
}


function Feedback({ application }) {
    const feedbackRef = useRef(null)
    const thankyouRef = useRef(null)
    const giveRef = useRef(null)
    const [rating, setRating] = useState(0)

    const clickedstar = (e) => {
        let tar = e.target
        if (tar.tagName === "path") tar = tar.parentNode
        let par = tar.parentNode
        let rating = parseInt(par.className[7])
        setRating(rating)
        giveRef.current.classList.add("disnone")
    }
    const givenrating = () => {
        thankyouRef.current.classList.remove("disnone")
        feedbackRef.current.classList.add("disnone")
    }

    const submit = () => {
        if (rating === 0) {
            giveRef.current.classList.remove("disnone")
        } else {
            fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ stars: rating, suggestion: feedbackRef.current.querySelector("textarea").value, application: application })
            }).then(res => res.json()).then((data) => {
                if (data.msg === "Success") {
                    givenrating()
                }
            })
        }
    }

    const clickedthankyou = () => {
        thankyouRef.current.parentNode.classList.add("disnone")
        localStorage.setItem(application + "feedback", "true")
    }
    return (
        <div className="mainfeedback disnone">
            <div className="feedback" ref={feedbackRef}>
                <h3>Feedback</h3>
                <p>Please Rate Your Experience!</p>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map((item) => {
                        return <Star key={item} i={item.toString()} clickedstar={clickedstar} rating={rating} />
                    })}
                </div>
                <p className="give disnone" ref={giveRef}>Please Give Rating</p>
                <p>Any Suggestions?</p>
                <textarea name="suggestion" rows={"3"}></textarea>
                <button onClick={submit}>Submit</button>
            </div>
            <div className="thankyou disnone" ref={thankyouRef}>
                <p>Thank You!</p>
                <button onClick={clickedthankyou}>Ok!</button>
            </div>
        </div>
    )
}

export default Feedback;