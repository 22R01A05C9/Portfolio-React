function Input({ref, oninp, searchby}){
    return(
        <div className="input">
            <input ref={ref} type="text" placeholder={"Enter " + searchby} onInput={oninp} name={searchby} autoComplete={searchby}/>
        </div>
    )

}

export default Input;