

import React from 'react';
import { socket } from '../../socket'

const ManageConnection = () => {

    const onConnect = () => {
        console.log('Conectado');
    }

    const onDisconnect = () => {
        console.log('Desconectado');
    }

    const handleConnection = (con) => {
        console.log(con);
        switch (con) {
            case 'on':
                socket.on('connect', onConnect)
                break;
            case 'off':
                socket.on('connect', onDisconnect)
                break;
            default:
                break;
        }
    }

    const handleDisconnect = () => {
        socket.off('connect', onConnect)
        socket.off('connect', onDisconnect)
    }

  return (
    <div className="manage-connection">
        <button onClick={() => handleConnection('on')}>Conectar</button>
        <button onClick={() => handleConnection('off')}>Desconectar</button>
    </div>
  )
}

export default ManageConnection