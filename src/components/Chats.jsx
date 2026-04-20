

import React, { useEffect, useState } from 'react'
import { socket } from '../../socket'

const Chats = () => {

    
   const [messages, setMessages] = useState([])

   useEffect(() => {
        socket.on('chat message', (msg, serverOffset) => {
            console.log('Mensaje desde el Server: ', msg);
            socket.auth.serverOffset = serverOffset;
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off('chat message');
        }
   }, []);


  return (
    <>
        {messages?.map((m) => (
            <p>{m}</p>
        ))}
    </>
  )
}

export default Chats
