import cryptojs from "crypto-js";

function App(){
	let ws;
	const connect = ()=>{
		ws?.close()
		ws = new WebSocket("/ws")
		ws.addEventListener("open",()=>{
			console.log("connected");
		})
		ws.addEventListener("message",(e)=>{
			console.log(e.data);
			alert(e.data)
		})
	}
	const send = ()=>{
		ws.send(JSON.stringify({
			token:cryptojs.AES.encrypt("hello",import.meta.env.VITE_SMS_API_KEY).toString()
		}))
	}
	return(
		<>
			<button onClick={connect}>Click to connect</button>
			<button onClick={send}>Click To Send</button>
		</>
	)
}

export default App;