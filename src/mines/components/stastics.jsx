import Statchart from "./statschart"


function Statistics(){
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


export default Statistics