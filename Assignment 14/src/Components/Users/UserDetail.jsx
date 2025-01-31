import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Users.css';

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div className="loading">Loading user details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!user) return null;

  return (
    
    <div className="user-detail-container">
      <div className="user-detail-card">
        <h1 className="user-detail-name">{user.name}</h1>
        <div className="user-info-section">
          <h2>📌 Contact Information</h2>
          <p>📧 Email: {user.email}</p>
          <p>📱 Phone: {user.phone}</p>
          <p>🌐 Website: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
        </div>

        <div className="user-info-section">
          <h2>🏢 Company Details</h2>
          <p>Name: {user.company.name}</p>
          <p>Catchphrase: "{user.company.catchPhrase}"</p>
          <p>Business: {user.company.bs}</p>
        </div>

        <div className="user-info-section">
          <h2>📍 Address</h2>
          <p>{user.address.street}, {user.address.suite}</p>
          <p>{user.address.city}, {user.address.zipcode}</p>
          <p>Coordinates: {user.address.geo.lat}, {user.address.geo.lng}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;