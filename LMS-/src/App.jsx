import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveDrawer from './Screens/ResponsiveDrawer';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import ProtectedRoute from './Screens/ProtectedRoute';
import AuthRoute from './AuthRoute';

const App = () => {
  return (
<Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<ResponsiveDrawer />} />
        </Route>

        <Route element={<AuthRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
  );
};

export default App;
