import "./output.css"
import Card from "./card";
import Loading from "../loading/loading"
import Scroll from "../scroll/scroll";
import Preview from "./preview";
import { useEffect, useRef, useState } from "react";

function Output({ data, loadmore, showload, loading }) {
    const [preview,setPreview] = useState(null);
    const buttonRef = useRef(null);
    const done = () => {
        buttonRef.current.classList.remove("loadmore");
    }

    const loadmorew = () => {
        buttonRef.current.classList.add("loadmore")
        loadmore(done);
    }

    const close = (e)=>{
        if(e.target.tagName === "IMG") return;
        setPreview(null)
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && showload && !loading) {
                loadmorew();
            }
        }, { threshold: 1 });
    
        observer.observe(buttonRef.current);
        return () => {
            observer.disconnect();
        }
    }, [data,loading])

    const showpreview = (roll) => {
        setPreview(roll);
    }
    return (
        <div className="output">
            {loading ? <Loading /> :
                data && data.length >= 1 ?
                    <>
                        <div className="students">
                            {
                                data.map((item) => {
                                    return <Card key={item.key} data={item} preview={showpreview} />
                                })
                            }
                        </div>
                    </> :
                    <p>No Data Found</p>
            }
            <span ref={buttonRef}></span>
            <Scroll />
            {preview !== null ? <Preview roll={preview} close={close}/> : null}
        </div>
    )
}

export default Output;