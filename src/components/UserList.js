import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = () => {
    const newUser = {
      id: users.length + 1, // Assigning array length + 1 as the id
      name,
      email,
    };

    setUsers([...users, newUser]);
    resetForm();
  };

  const updateUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUserId ? { ...user, name, email } : user
    );
    setUsers(updatedUsers);
    resetForm();
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const submitUser = (event) => {
    event.preventDefault();
    if (editingUserId) {
      updateUser();
    } else {
      createUser();
    }
  };

  const editUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditingUserId(user.id);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setEditingUserId(null);
  };

  return (
    <div>
      <h1>User List</h1>
      <form onSubmit={submitUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">{editingUserId ? 'Update' : 'Add'}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td> {/* Use array index + 1 as the id */}
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
