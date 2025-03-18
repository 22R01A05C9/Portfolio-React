import { copy } from "../../hooks/output";

function Output({ data }) {
    return (
        <div className="output">
            <p>File Has Been Uploaded Successfully!!</p>
            <p className="showcode">Your Code is <strong>{data.id}</strong></p>
            <div className="buttons">
                {
                    ["Code", "Link"].map((item) => {
                        return (
                            <button key={item} onClick={(e) => { copy(e, data) }}>Copy {item}</button>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Output
