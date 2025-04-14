
function Preview({ roll, close }) {
    return (
        <div className="preview" onClick={close}>
            <div className="close" >
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#1f1f1f"><path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" /></svg>
            </div>
            <img src={`https://cmrstatic.saiteja.site/${roll}.jpg`} alt="Student Image" />
        </div>
    )
}

export default Preview