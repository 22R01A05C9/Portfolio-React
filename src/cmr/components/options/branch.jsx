import Option from "../option/option";

function Branch({ branch, set, year }) {
    return (
        <div className="branch">
            <p>Select Branch:</p>
            <div className="showoptions">
                {
                    year === "2023" || year === "2024" ?
                        ["ALL", "CSE", "ECE", "CSM", "CSD"].map((y) => {
                            return <Option key={y} option={y} active={branch === y} onclick={() => { set(y); }} />
                        }) :
                        ["ALL", "CSE", "ECE", "CSM", "CSD", "CSC", "AIML"].map((y) => {
                            return <Option key={y} option={y} active={branch === y} onclick={() => { set(y); }} />
                        })}
            </div>
        </div>
    )
}

export default Branch;