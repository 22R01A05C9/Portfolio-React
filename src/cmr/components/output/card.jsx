function Card({ data, preview }) {
    const copyfallback = (text) => {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    }
    const copy = (e) => {
        let link = `${window.location.origin}${import.meta.env.VITE_CMR_PATH}/${data.roll}`;
        if(navigator.clipboard){
            navigator.clipboard.writeText(link);
        }else{
            copyfallback(link);
        }
        e.target.innerHTML = 'Copied!';
        setTimeout(() => {
            e.target.innerHTML = 'Copy Link';
        }, 2000);
    }
    return (
        <div className="card">
            <div className="img" onClick={()=>{preview(data.roll)}}>
                <img src={`https://cmrstatic.saiteja.site/${data.roll}.jpg`} alt="Student Image" />
                <div className="ficon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z" /></svg>
                </div>
            </div>
            <div className="info">
                <h4>{data.name}</h4>
                <p><strong>Roll No:</strong> {data.roll}</p>
                <p><strong>Branch:</strong> {data.branch}</p>
                <p><strong>Year:</strong> {data.year}</p>
            </div>
            <button className="copylink" onClick={copy}>Copy Link</button>
        </div>
    )
}

export default Card;