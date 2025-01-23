import Header from "../../components/header/header"
import "./sms.css"
import Smsradio from "../../components/smsradio/smsradio"
function Sms(){
    return(
        <div className="sms">
            <Header ext="/" />
            <div className="smsbody">
                <h2>SMS Bomber</h2>
                <p className="sinfo">Please Enter The Below Details To Start Bombing</p>
                <div className="userinputs">
                    <div className="number">
                        <label htmlFor="number">Number</label>
                        <input type="number" id="number" max={"10"}/>
                    </div>
                    <div className="times">
                        <label htmlFor="times">SMS</label>
                        <input type="number" id="times"/>
                    </div>
                    <div className="speed">
                        <Smsradio options={['Slow','Medium','Fast']} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Sms