



import React, { useState } from 'react';
import { socket } from '../../socket';

const MyForm = () => {
    const [message, setMessage] = useState('')

    const handleOnChange = (e) => {
        setMessage(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        socket.emit('chat message', message)
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