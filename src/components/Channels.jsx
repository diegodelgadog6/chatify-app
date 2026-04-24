
const Channels = ({ selectedChannel, rooms, onRequestRoomChange }) => {
  const handleChannelClick = (channel) => {
    onRequestRoomChange(channel)
  }

  return (
    <div>
      <h3>Canales</h3>
      <ul>
        {rooms.map((channel) => (
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
