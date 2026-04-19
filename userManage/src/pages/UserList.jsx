import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className='container'>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Users</h2>
        <Link to="/users/add" className="btn-primary" style={{ textDecoration: 'none' }}>Add User</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td style={{ display: 'flex', gap: '10px' }}>
                <Link to={`/users/${user.id}/view`} className='btn-primary' style={{ textDecoration: 'none' }}>View</Link>
                <Link to={`/users/${user.id}/edit`} className='btn-primary' style={{ textDecoration: 'none', backgroundColor: '#e6a23c' }}>Edit</Link>
                <button onClick={() => handleDeleteUser(user.id)} className='btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
