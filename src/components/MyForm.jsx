



import React, { useState } from 'react';
import { socket } from '../socket';

const MyForm = ({selectedChannel}) => { // selected channel from App.jsx to know where to send the message
    const [message, setMessage] = useState('')

    const handleOnChange = (e) => {
        setMessage(e.target.value)
    }

    // ticket 1 
    // sends message with the username and the room to the server now
    const handleClick = (e) => {
        e.preventDefault()
        socket.emit('chat message', {content: message, username: 'test user', room: selectedChannel}); // added selected channel 
        setMessage(''); // clearing the input after the message is sent 
    }

    return (
        <div className="my-form">
            
            <input 
                type="text" 
                placeholder='Escribe tu mensaje...'
                value={message}
                onChange={handleOnChange}
            />
            
            <button className="emoji-btn" title="Emojis">😊</button>

            <button onClick={handleClick}>Send</button>
        </div>
    )
}

export default MyForm