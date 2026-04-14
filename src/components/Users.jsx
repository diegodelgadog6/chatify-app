import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const randomUsers = [
      { id: 1, name: 'Diego' },
      { id: 2, name: 'Carlos' },
      { id: 3, name: 'María' },
      { id: 4, name: 'Juan' },
      { id: 5, name: 'Andrea' }
    ];
    setUsers(randomUsers);
  }, []);

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
