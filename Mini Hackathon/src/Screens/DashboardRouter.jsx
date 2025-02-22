import React from 'react';
import { Navigate } from 'react-router-dom';

const DashboardRouter = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return userData.role === 'admin' 
    ? <Navigate to="/admin-dashboard" />
    : <Navigate to="/user-dashboard" />;
};

export default DashboardRouter;