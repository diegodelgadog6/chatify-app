import { useEffect, useState } from 'react'
import { socket } from '../socket'

const Users = ({ usuarioActual, roomActual }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Handler para 'room users' - reemplaza lista completa
    const handleRoomUsers = (data) => {
      const { users: usersList } = data
      setUsers(usersList)
    }

    // Handler para 'user joined' - agrega si no existe (defensa contra duplicados)
    const handleUserJoined = (data) => {
      const { username } = data
      setUsers((prev) => {
        if (!prev.includes(username)) {
          return [...prev, username]
        }
        return prev
      })
    }

    // Handler para 'user left' - filtra
    const handleUserLeft = (data) => {
      const { username } = data
      setUsers((prev) => prev.filter((u) => u !== username))
    }

    // Registrar listeners
    socket.on('room users', handleRoomUsers)
    socket.on('user joined', handleUserJoined)
    socket.on('user left', handleUserLeft)

    // CLEANUP CRÍTICO: cuando roomActual cambia, se ejecuta esto primero
    return () => {
      socket.off('room users', handleRoomUsers)
      socket.off('user joined', handleUserJoined)
      socket.off('user left', handleUserLeft)
    }
  }, [roomActual]) // Re-ejecuta si el room cambia

  // Early return si roomActual es undefined/null
  if (!roomActual) {
    return null
  }

  return (
    <div>
      <h3>ROOM: {roomActual.toUpperCase()}</h3>
      <ul>
        {users.map((user) => {
          const isCurrentUser = user === usuarioActual

          return (
            <li
              key={user}
              className={`user-item ${isCurrentUser ? 'user-item-current' : ''}`}
            >
              <span className="user-initial">{user.charAt(0).toUpperCase()}</span>
              <span className="user-name">{user}</span>
              {isCurrentUser && (
                <span className="user-online-badge">ONLINE</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Users
