
import { useEffect, useState } from 'react'
import { socket } from '../socket'

const Chats = () => {

   const [messages, setMessage] = useState([]);

   // ticket 1 
   useEffect(() => {
    // to lead history of messages when joining the room 
    socket.on('room history', (history) => {
        setMessage(history);
    });

    // add to list wehn a new message is received
    socket.on('chat message', (msg) => {
        setMessage((prev) => [...prev, msg]);
    });

    // cleanup fnc
    return () => {
        socket.off('room history');
        socket.off('chat message');
    }
   }, []);


  return (
    <div className="chats-container">
        <div className="chats-list">
            {messages?.length > 0 ? (
                messages.map((m, index) => (
                    <div key={index} className="chat-item"> 
                    <strong>{m.username}</strong>: {m.content} {/* strong tag to make the username bold */} 
                    </div>
                ))
            ) : (
                <p className="chats-empty">Todavia no hay mensajes en este canal.</p>
            )}
        </div>
    </div>
  )
}

export default Chats
