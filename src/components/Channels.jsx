import React, { useState } from 'react';
import { socket } from '../socket';

const Channels = () => {
  const channels = [
    'general',
    'random',
    'tech',
    'gaming',
    'music'
  ];

  const [selectedChannel, setSelectedChannel] = useState('general');

  // changed the function to handle teh chanel switching : leaves the current room and joins the new one 
  const handleChannelClick = (channel) => {
    if (selectedChannel !== channel) {
      socket.emit('leave room', {room: selectedChannel});
  }
    setSelectedChannel(channel);
    socket.emit('join room', { username: 'test user', room: channel });
  };

  return (
    <div>
      <h3>Canales</h3>
      <ul>
        {channels.map((channel) => (
          <li
            key={channel}
            onClick={() => handleChannelClick(channel)}
            style={{ backgroundColor: selectedChannel === channel ? '#7289da' : 'transparent' }}
          >
            #{channel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
