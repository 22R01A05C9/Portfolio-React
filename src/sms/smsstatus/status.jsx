import "./status.css"

function SmsStatus({sent,total}){
    let per = ((sent/total)*97).toString()+"%"
    return(
        <div className="data">
            <p className="sent"><strong> {sent} </strong>  Sms Sent Successfully </p>
            <div className="progress">
                <span 
                    className="bar" 
                    style={{"width":per}}>

                </span>
            </div>
        </div>
    )
    
}

export default SmsStatus