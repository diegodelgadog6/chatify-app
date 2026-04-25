
import { useEffect, useState } from 'react'
import { socket } from '../socket'

const Chats = ({ myUsername, typingUsers }) => {

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
                messages.map((msg) => {
                    // ticket 4
                    // identifies if message is ours
                    const isMe = msg.username?.trim().toLowerCase() === myUsername?.trim().toLowerCase();
                    // format time to HH:MM
                    const rawDate = msg.created_at; 
                    let time = '';

                    if (rawDate) {
                        const d = new Date(rawDate);
                        // Extraemos las horas y minutos directamente del objeto sin dejar que el navegador los mueva
                        let hours = d.getUTCHours(); 
                        const minutes = d.getUTCMinutes().toString().padStart(2, '0');
                        const ampm = hours <= 12 ? 'PM' : 'AM';
                        
                        hours = hours % 12;
                        hours = hours ? hours : 12; // el número '0' debería ser '12'
                        
                        time = `${hours}:${minutes} ${ampm}`;
                    }
                    // returns the message bubble with attribution and timestamp
                    return (
                        <div 
                            key={msg.id} 
                            className={`message-item ${isMe ? 'sent' : 'received'}`}
                        >
                            <div className="message-bubble">
                                {/* show username only if is not mine */}
                                {!isMe && <span className="message-author">{msg.username}</span>}
                                
                                <p className="message-content">{msg.content}</p>
                                
                                {/* message timestamp */}
                                <span className="message-time">{time}</span>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="chats-empty">Todavia no hay mensajes en este canal.</p>
            )}
            {typingUsers && typingUsers.size > 0 && (
                <div className="typing-indicator">
                    <p className="typing-text">
                        {Array.from(typingUsers).join(', ')} {typingUsers.size === 1 ? 'está' : 'están'} escribiendo...
                    </p>
                </div>
            )}        </div>
    </div>
  )
}

export default Chats
