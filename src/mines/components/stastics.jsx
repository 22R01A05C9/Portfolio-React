import Statchart from "./statschart"


function Statistics(){
    return(
        <div className="statistics">
            <div className="left">
                <div className="info">
                    <div className="total">
                        <p> Total Games Played: <strong>1234</strong> </p>
                    </div>
                    <div className="maxscore">
                        <p>Maximum Score: <strong></strong></p>
                    </div>
                    <div className="minscore">
                        <p>Minimum Score: <strong>10:00</strong></p>
                    </div>
                    <div className="average">
                        <p>Average Score: <strong></strong></p>
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


export default Statistics