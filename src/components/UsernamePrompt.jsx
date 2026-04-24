import { useState } from 'react'

const UsernamePrompt = ({ room, rooms, onRoomChange, onConfirm }) => {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedUsername = username.trim()

    if (trimmedUsername.length < 2) {
      setError('El username debe tener al menos 2 caracteres.')
      return
    }

    const isSaved = onConfirm({ room, username: trimmedUsername })

    if (!isSaved) {
      setError('El username no es válido.')
      return
    }

    setError('')
  }

  const handleRoomSelect = (event) => {
    onRoomChange(event.target.value)
  }

  return (
    <div className="username-prompt-backdrop" role="presentation">
      <form className="username-prompt" onSubmit={handleSubmit}>
        <p className="username-prompt-kicker">JOIN CHATIFY</p>
        <h2>Elige tu identidad</h2>
        <p className="username-prompt-copy">
          Necesitas un username válido para entrar al room seleccionado.
        </p>

        <label className="username-prompt-field">
          <span>Room</span>
          <select value={room} onChange={handleRoomSelect}>
            {rooms.map((roomOption) => (
              <option key={roomOption} value={roomOption}>
                {roomOption}
              </option>
            ))}
          </select>
        </label>

        <label className="username-prompt-field">
          <span>Username</span>
          <input
            autoFocus
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Escribe tu username"
          />
        </label>

        <div className="username-prompt-actions">
          <button type="submit">JOIN ROOM</button>
        </div>

        {error ? <p className="username-prompt-error">{error}</p> : null}
      </form>
    </div>
  )
}

export default UsernamePrompt