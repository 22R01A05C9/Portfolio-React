function Input({rollref, nameref, oninp, searchby}){
    return(
        <div className="input">
            <input style={{display:(searchby !== "Roll" ? "block" : "none")}} ref={nameref} type="text" placeholder={"Enter Name"} onInput={oninp} name={"Name"} autoComplete={"Name"}/>
            <input style={{display:(searchby === "Roll" ? "block" : "none")}} ref={rollref} type="text" placeholder={"Enter Roll"} onInput={oninp} name={"Roll"} autoComplete={"ROll"}/>
        </div>
    )

}

export default Input;