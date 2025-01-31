import React, { useState, useEffect } from 'react';
import './Users.css';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="users-page">
      <div className='app-header'>
        <h1>User Directory</h1>
        <p className="page-description">Browse through our community members</p>
      </div>
      <div className="user-container">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-card-header">
              <h2 className="user-name">{user.name}</h2>
              <p className="user-username">@{user.username.toLowerCase()}</p>
            </div>
            <div className="user-card-body">
              <p className="user-info">📧 {user.email}</p>
              <p className="user-info">📱 {user.phone}</p>
              <button 
                className="view-more-btn"
                onClick={() => navigate(`/users/${user.id}`)}
              >
                View Profile →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;