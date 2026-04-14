

import { useEffect } from 'react'
import './App.css'
import { socket } from '../socket'
import ManageConnection from './components/ManageConnection';
import MyForm from './components/MyForm';
import Channels from './components/Channels';
import Users from './components/Users';

function App() {

  useEffect(() => {
    
    const onConnect = () => {
      console.log('Conectado');
    }
    socket.on('connect', onConnect);

  }, [])

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Chatify</h1>
      </div>
      
      <div className="app-content">
        <div className="channels-panel">
          <Channels />
        </div>

        <div className="chat-panel">
          <ManageConnection />
          <MyForm />
        </div>

        <div className="users-panel">
          <Users />
        </div>
      </div>
    </div>
  )
}

export default App