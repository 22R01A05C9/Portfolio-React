import diamond from "../../assets/minesimages/diamond.png"
import bomb from "../../assets/minesimages/goodbomb.png"
import img from "../../assets/minesimages/golds-removebg-preview.png"
function Block(props) {
    return (
        <div className={"block a" + props.id} onClick={props.clicked}>
            <img src={diamond} className={"diamond"} />
            <img src={bomb} className="bomb" />
            <img src={img} className="twinkle" />
        </div>
    )
}

export default Block;