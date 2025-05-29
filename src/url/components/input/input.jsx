import "./input.css"

function Input({ type, label, placeholder, id, okd, ref, value, dis}) {
    return (
        <div className="input">
            {label && <label htmlFor={id}>{label}</label>}
            <input type={type} placeholder={placeholder} id={id} onKeyDown={okd} ref={ref} value={value} disabled={dis}/>
        </div>
    );
}

export default Input;