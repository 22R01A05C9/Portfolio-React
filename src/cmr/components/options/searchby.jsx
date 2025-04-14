import Option from "../option/option";

function Searchby({ searchby, set }) {
    return (
        <div className="searchby">
            <p>Search By: </p>
            <div className="showoptions">
                {
                    ["Name", "Roll"].map((y) => {
                        return <Option key={y} option={y} active={searchby === y} onclick={() => { set(y); }} />
                    })
                }
            </div>
        </div>
    )
}

export default Searchby;