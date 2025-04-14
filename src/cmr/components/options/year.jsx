import Option from "../option/option";

function Year({ year, set }) {
    return (
        <div className="year">
            <p>Slect Year:</p>
            <div className="showoptions">
                {["ALL", "2022", "2023"].map((y) => {
                    return <Option key={y+"year"} option={y} active={year === y} onclick={() => { set(y); }} />
                })}
            </div>
        </div >
    )
}

export default Year;