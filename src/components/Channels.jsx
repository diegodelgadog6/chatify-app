import React, { useState } from 'react';
import { socket } from '../../socket';

const Channels = () => {
  const [channels] = useState([
    'general',
    'random',
    'tech',
    'gaming',
    'music'
  ]);
  const [selectedChannel, setSelectedChannel] = useState('general');

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    socket.emit('join channel', channel);
  };

  return (
    <div>
      <h3>Canales</h3>
      <ul>
        {channels.map((channel) => (
          <li 
            key={channel} 
            onClick={() => handleChannelClick(channel)}
            style={{
              backgroundColor: selectedChannel === channel ? '#7289da' : 'transparent'
            }}
          >
            #{channel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
