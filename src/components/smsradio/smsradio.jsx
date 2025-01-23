import "./smsradio.css"

function Smsradio(props){
    function setoption(e){
        console.log(e.target);
        document.querySelectorAll(".option").forEach((element)=>{
            element.classList.remove("active")
        })
        if(e.target.classList.contains("circle") || e.target.classList.contains("radiobtn")){
            e.target.parentNode.classList.add("active")
        }else{
            e.target.classList.add("active")
        }
    }
    return(
        <div className="radio">
            {
                props.options.map((val)=>{
                    return(
                        <div className={"option "+ (val=="Slow"?"active":"")} onClick={setoption} key={val}>
                            <span className="circle"></span>
                            <span id={val} className="radiobtn">{val}</span>
                        </div>
                        
                    )

                })
            }
        </div>
    )
}

export default Smsradio