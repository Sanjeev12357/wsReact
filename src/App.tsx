import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [latestMessage,setLatestMessage] = useState<string | null>("")

  useEffect(()=>{
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen=()=>{
      console.log('connected')
      setSocket(socket)
      
    }

    socket.onmessage=(message)=>{
      console.log('message',message.data)
      setLatestMessage(message.data)
    }

    return ()=>{
      socket.close()
    }
    
  },[])
  if(!socket) {
    return <div>
      loading ..

    </div>
  }

  return (
    <div>
      <button onClick={()=>{
        socket.send('Hello from client')
      }}>send</button>
      {latestMessage}

    </div>
  )
}

export default App;
