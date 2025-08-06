import "./status.css"

function Status({ file, per }) {
    let name, size;
    if (file) {
        if (file.name.length > 16) {
            let l = file.name.length
            name = file.name.slice(0, 10) + "....." + file.name.slice(l - 5, l)
        } else {
            name = file.name
        }
        let exp = /^[0-9]{1,3}.[0-9]{2} MB$/
        if (exp.test(file.size)) size = file.size
        else size = parseFloat(file.size / 1000000).toFixed(2).toString() + " MB"
    }

    return (
        <div className="status">
            {file &&
                <div className="info">
                    <p><strong>File:</strong> {name}</p>
                    <p><strong>Size:</strong> {size}</p>
                </div>}

                <div className="percentage">
                    <p>0</p>
                    <p>{per}</p>
                    <p>100</p>
                </div>
            <div className="progressouter">
                <div className="inner" style={{ width: per }}></div>
            </div>
        </div>
    )
}

export default Status