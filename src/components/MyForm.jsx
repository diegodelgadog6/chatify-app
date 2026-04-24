

import { useState } from 'react'
import { socket } from '../socket';

const MyForm = ({ selectedChannel, username, isRoomReady }) => {
    const [message, setMessage] = useState('')

    const handleOnChange = (e) => {
        setMessage(e.target.value)
    }

    // ticket 1 
    // sends message with the username and the room to the server now
    const handleClick = (e) => {
        e.preventDefault()
        const trimmedMessage = message.trim()

        if (!isRoomReady || !trimmedMessage) {
            return
        }

        socket.emit('chat message', { content: trimmedMessage, username, room: selectedChannel });
        setMessage('');
    }

    return (
        <div className="my-form">
            
            <input 
                type="text" 
                placeholder='Escribe tu mensaje...'
                value={message}
                onChange={handleOnChange}
                disabled={!isRoomReady}
            />
            
            <button className="emoji-btn" title="Emojis">😊</button>

            <button onClick={handleClick} disabled={!isRoomReady || !message.trim()}>Send</button>
        </div>
    )
}

export default MyForm