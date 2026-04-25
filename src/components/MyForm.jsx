

import { useState, useRef } from 'react'
import { socket } from '../socket';

const MyForm = ({ selectedChannel, username, isRoomReady }) => {
    const [message, setMessage] = useState('')
    const typingTimeoutRef = useRef(null)
    const hasEmittedTypingRef = useRef(false)

    const handleOnChange = (e) => {
        setMessage(e.target.value)

        if (!isRoomReady || !username) {
            return
        }

        // Clear previous timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        // Emit typing only once per input session
        if (!hasEmittedTypingRef.current) {
            socket.emit('typing', {
                username,
                room: selectedChannel,
            })
            hasEmittedTypingRef.current = true
        }

        // Set timeout to emit stop typing after 3 seconds of inactivity
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('stop typing', {
                username,
                room: selectedChannel,
            })
            hasEmittedTypingRef.current = false
        }, 3000)
    }

    // ticket 1 
    // sends message with the username and the room to the server now
    const handleClick = (e) => {
        e.preventDefault()
        const trimmedMessage = message.trim()

        if (!isRoomReady || !trimmedMessage) {
            return
        }

        // Clean up typing event when message is sent
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        socket.emit('stop typing', {
            username,
            room: selectedChannel,
        })

        socket.emit('chat message', { 
            content: trimmedMessage, 
            username, 
            room: selectedChannel });
        setMessage('');
        hasEmittedTypingRef.current = false
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