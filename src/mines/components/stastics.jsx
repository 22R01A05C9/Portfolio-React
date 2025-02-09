import Statchart from "./statschart"


function Stats(){
    return(
        <div className="statistics">
            <div className="left">
                <div className="info">
                    <div className="total">
                        <p> Total Games: <strong>1234</strong> </p>
                    </div>
                    <div className="maxscore">
                        <p>Maximum Score: <strong>350</strong></p>
                    </div>
                    <div className="minscore">
                        <p>Minimum Score: <strong>300</strong></p>
                    </div>
                    <div className="average">
                        <p>Average Score: <strong>200</strong></p>
                    </div>
                </div>
                <div className="resetstats">
                    <button>Reset Statistics</button>
                </div>
            </div>
            
            <Statchart />
        </div>
    )
}

function Playgame(){
    return(
        <div className="playgame">
            <p>Please Play Atleast One Game To Display The statistics</p> 
        </div>
    )
}


function Statistics(){
    return (
        <div className="tab">
            {
            localStorage.getItem("statistics")!==null ? <Stats /> : <Playgame />
        }
        </div>
    )
}


export default Statistics