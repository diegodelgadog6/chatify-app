import { useState } from 'react'

const Users = () => {
  const [users] = useState([
    { id: 1, name: 'Diego' },
    { id: 2, name: 'Carlos' },
    { id: 3, name: 'María' },
    { id: 4, name: 'Juan' },
    { id: 5, name: 'Andrea' },
  ])

  return (
    <div>
      <h3>Usuarios Conectados</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span style={{ color: '#43b581', marginRight: '5px' }}>●</span>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
