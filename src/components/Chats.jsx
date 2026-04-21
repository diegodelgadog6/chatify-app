

import React, { useEffect, useState } from 'react'
import { socket } from '../socket'

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
    <div className="chats-container">
        <ul className="chats-list">
            {messages?.length > 0 ? (
                messages.map((m, index) => (
                    <li key={`${m}-${index}`} className="chat-item">{m}</li>
                ))
            ) : (
                <p className="chats-empty">Todavia no hay mensajes en este canal.</p>
            )}
        </ul>
    </div>
  )
}

export default Chats
