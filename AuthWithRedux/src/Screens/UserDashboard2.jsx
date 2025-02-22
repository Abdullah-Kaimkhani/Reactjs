import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Typography, Paper } from '@mui/material';

const UserDashboard = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (!userData) {
    return <Navigate to="/login" />;
  }

  if (userData.role !== 'user') {
    return <Navigate to="/admin-dashboard" />;
  }

  return (
    <Paper sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome User {userData.name}!
      </Typography>
      <Typography variant="body1">
        This is your personal dashboard.
      </Typography>
      {/* Add user-specific content here */}
    </Paper>
  );
};

export default UserDashboard;