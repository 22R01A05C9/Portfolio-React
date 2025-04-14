import "./option.css"

function OPtion({ option, onclick, active}) {
    return (
        <button className={"option " + (active ? "active" : "")} onClick={onclick}>
            {option}
        </button>
    );
}

export default OPtion;