import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardRouter from './Screens/DashboardRouter';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import UserDashboard from './Screens/User/UserDashboard';
import LandingPage from './Screens/LandingPage';
import AdminDashboard from './Screens/Admin/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<DashboardRouter />} />
      <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
      <Route path="/user-dashboard/*" element={<UserDashboard />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;