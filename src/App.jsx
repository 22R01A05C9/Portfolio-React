import cryptojs from "crypto-js";

function App(){
	let ws;
	const connect = ()=>{
		ws?.close()
		ws = new WebSocket("/ws")
		ws.addEventListener("open",()=>{
			console.log("connected");
			submit()
		})
		ws.addEventListener("message",(e)=>{
			console.log(e.data);
		})
	}
	const submit = ()=>{
		ws.send(JSON.stringify({
			token:cryptojs.AES.encrypt(JSON.stringify({number:"8639625032",times:30,speed:1000}),import.meta.env.VITE_SMS_API_KEY).toString()
		}))
	}
	return(
		<>
			<input type="number" placeholder="enter number" id="number"></input>
			<input type="number" placeholder="enter number of sms" id="times"></input>
			<input type="number" placeholder="enter speed" id="speed"></input>
			<button onClick={connect}>Submit</button>
		</>
	)
}

export default App;