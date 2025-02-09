import { LineChart, XAxis, YAxis, Tooltip, Line, CartesianGrid, ResponsiveContainer } from "recharts"

function Statchart(){
    let data=[
        {game:"1",score:100},
        {game:"2",score:70},
        {game:"3",score:150},
        {game:"4",score:10},
        {game:"5",score:50},
        {game:"6",score:0},
        {game:"7",score:75},
        {game:"8",score:100},
        {game:"9",score:120},
        {game:"10",score:180},

    ]
    return(
        <div className="chart">
            <p>Statistics For Last 10 Games </p>
            <ResponsiveContainer height={"100%"} width={"90%"} style={{position:"relative","left":"-5%"}}>
                <LineChart data={data}>
                    <XAxis dataKey={"game"}/>
                    <YAxis />
                    <CartesianGrid stroke="#eee"/>
                    <Tooltip stroke="#fff"/>
                    <Line type={"linear"} stroke="#fff" dataKey={"score"}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
        
    )
}

export default Statchart