import cryptojs from 'crypto-js';
import qrcode from "qrcode"
import { useState, useRef } from 'react';

function App(){
  const [imgcode,setimgcode]=useState("")
  const inpref = useRef()
  const encrypt = ()=>{
    let text = "Hello World";
    let encryptedText = cryptojs.AES.encrypt(text,import.meta.env.VITE_API_KEY).toString();
    return encryptedText;
  }
  const generate =  ()=>{
    qrcode.toDataURL(inpref.current.value).then((data)=>{
      setimgcode(data)
    })
  }
  return (
    <div>
      <input type="text" id="data" ref={inpref}/>
      <button onClick={generate}>Generate</button>
      <img className='qrimage' src={imgcode} alt="" />
      <a href={imgcode} download={"qrcode.png"}>Click To download</a>
    </div>
  )
}

export default App;