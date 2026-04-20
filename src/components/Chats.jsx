

import React, { useEffect, useState } from 'react'
import { socket } from '../../socket'

const Chats = () => {

   const [messages, setMessage] = useState([]);

   useEffect(() => {
        socket.on('chat message', (msg, serverOffset) => {
            console.log('Mensaje desde Server: ', msg);
            socket.auth.serverOffset = serverOffset;
            setMessage((prev) => [...prev, msg]);
        });

        return () => {
            socket.off('chat message');
        }
   }, []);


  return (
    <>
        <strong>Chat</strong>
        {messages?.map((m) => (
            <p>{m}</p>
        ))}
    </>
  )
}

export default Chats
