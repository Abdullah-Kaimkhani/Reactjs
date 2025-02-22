import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Typography, Paper } from '@mui/material';

const AdminDashboard = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (!userData) {
    return <Navigate to="/login" />;
  }

  if (userData.role !== 'admin') {
    return <Navigate to="/user-dashboard" />;
  }

  return (
    <Paper sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome Admin {userData.name}!
      </Typography>
      <Typography variant="body1">
        You have access to administrative features.
      </Typography>
      {/* Add admin-specific content here */}
    </Paper>
  );
};

export default AdminDashboard;