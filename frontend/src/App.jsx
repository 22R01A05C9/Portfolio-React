import cryptojs from 'crypto-js';

function App(){
  const encrypt = ()=>{
    let text = "Hello World";
    let encryptedText = cryptojs.AES.encrypt(text,import.meta.env.VITE_API_KEY).toString();
    return encryptedText;
  }
  return (
    <div>
      <h1>My First React App</h1>
      <h3>React is awesome</h3>
      <p>{encrypt()}</p>
    </div>
  )
}

export default App;