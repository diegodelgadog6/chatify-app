

import { useEffect, useRef, useState } from 'react'
import './App.css'
import { socket } from './socket'
import ManageConnection from './components/ManageConnection'
import MyForm from './components/MyForm'
import Channels from './components/Channels'
import Users from './components/Users'
import Chats from './components/Chats'
import UsernamePrompt from './components/UsernamePrompt'

const STORAGE_KEY = 'chatify_usernames_by_room'
const DEFAULT_ROOM = 'general'
const ROOMS = ['general', 'random', 'tech talk', 'gaming']

function App() {
  const [selectedChannel, setSelectedChannel] = useState(DEFAULT_ROOM)
  const [usernamesByRoom, setUsernamesByRoom] = useState({})
  const [currentUsername, setCurrentUsername] = useState('')
  const [pendingRoom, setPendingRoom] = useState(DEFAULT_ROOM)
  const [typingUsers, setTypingUsers] = useState(new Set())
  const joinedRoomRef = useRef(null)

  const roomUsername = (usernamesByRoom[selectedChannel] ?? '').trim()
  const isRoomReady = roomUsername.length >= 2

  useEffect(() => {
    const onConnect = () => {
      console.log('Conectado');
    }

    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    }

  }, [])

  useEffect(() => {
    const onUserTyping = ({ username, room }) => {
      if (room === selectedChannel && username !== roomUsername) {
        setTypingUsers((prev) => new Set([...prev, username]))
      }
    }

    const onStopTyping = ({ username, room }) => {
      if (room === selectedChannel) {
        setTypingUsers((prev) => {
          const next = new Set(prev)
          next.delete(username)
          return next
        })
      }
    }

    socket.on('user typing', onUserTyping)
    socket.on('stop typing', onStopTyping)

    return () => {
      socket.off('user typing', onUserTyping)
      socket.off('stop typing', onStopTyping)
    }
  }, [selectedChannel, roomUsername])

  useEffect(() => {
    return () => {
      setTypingUsers(new Set())
    }
  }, [selectedChannel])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(usernamesByRoom))
    } catch (error) {
      console.error('No se pudo guardar el username por room', error)
    }
  }, [usernamesByRoom])

  useEffect(() => {
    if (!isRoomReady) {
      if (joinedRoomRef.current) {
        socket.emit('leave room', { room: joinedRoomRef.current })
        joinedRoomRef.current = null
      }

      return
    }

    if (joinedRoomRef.current && joinedRoomRef.current !== selectedChannel) {
      socket.emit('leave room', { room: joinedRoomRef.current })
    }

    if (joinedRoomRef.current !== selectedChannel) {
      socket.emit('join room', { username: roomUsername, room: selectedChannel })
      joinedRoomRef.current = selectedChannel
    }
  }, [isRoomReady, roomUsername, selectedChannel])

  useEffect(() => {
    return () => {
      if (joinedRoomRef.current) {
        socket.emit('leave room', { room: joinedRoomRef.current })
      }
    }
  }, [])

  const handleRoomChange = (room) => {
    setSelectedChannel(room)

    const nextUsername = (usernamesByRoom[room] ?? '').trim()

    setCurrentUsername(nextUsername)
    setPendingRoom(nextUsername ? null : room)
  }

  const handleUsernameConfirm = ({ room, username }) => {
    const trimmedUsername = username.trim()

    if (trimmedUsername.length < 2) {
      return false
    }

    setUsernamesByRoom((previousUsernames) => ({
      ...previousUsernames,
      [room]: trimmedUsername,
    }))
    setSelectedChannel(room)
    setCurrentUsername(trimmedUsername)
    setPendingRoom(null)

    return true
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Chatify</h1>
      </div>
      
      <div className="app-content">
        <div className="channels-panel">
          <Channels
            selectedChannel={selectedChannel}
            rooms={ROOMS}
            onRequestRoomChange={handleRoomChange}
          />
        </div>

        <div className="chat-panel">
          <ManageConnection />
          <p className="chat-room-status">
            {isRoomReady
              ? `Conectado como ${currentUsername || roomUsername} en #${selectedChannel}`
              : `Configura tu username para entrar a #${selectedChannel}`}
          </p>
          <Chats key={selectedChannel} 
          //added on ticket 4 to divide between own messages and others
          myUsername={roomUsername}
          typingUsers={typingUsers}
          />
          <MyForm
            selectedChannel={selectedChannel}
            username={roomUsername}
            isRoomReady={isRoomReady}
          />
        </div>

        <div className="users-panel">
          <Users
            usuarioActual={roomUsername}
            roomActual={selectedChannel}
          />
        </div>
      </div>

      {!isRoomReady ? (
        <UsernamePrompt
          key={pendingRoom ?? selectedChannel}
          room={pendingRoom ?? selectedChannel}
          rooms={ROOMS}
          onRoomChange={handleRoomChange}
          onConfirm={handleUsernameConfirm}
        />
      ) : null}
    </div>
  )
}

export default App