

import { socket } from '../socket'

const ManageConnection = () => {
    
    const handleConnection = (con) => {
        console.log(con);
        switch (con) {
            case 'on':
                socket.connect();
                break;
            case 'off':
                socket.disconnect();
                break;
            default:
                break;
        }
    }

  return (
    <div className="manage-connection">
        <button onClick={() => handleConnection('on')}>Conectar</button>
        <button onClick={() => handleConnection('off')}>Desconectar</button>
    </div>
  )
}

export default ManageConnection