import React, { useEffect, useState } from 'react';
import { Button, Paper, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginUser } from '../store/./slices/authSlice';

const Login = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      navigate('/dashboard');
    }
  }, [navigate]);


  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = async () => {
    if (!role) {
      Swal.fire({
        title: "Error!",
        text: "Please select a role!",
        icon: "error"
      });
      return;
    }

    try {
      await dispatch(loginUser({ email, password, role })).unwrap();
      Swal.fire({
        title: "Congratulations!",
        text: "Logged in successfully!",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/dashboard');
        }
      });
    } catch (error) {
      let errorMessage = "Invalid email or password";
      if (error === "Role mismatch") {
        errorMessage = "Role does not match. Please select the correct role.";
      }
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error"
      });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 5,
        margin: 'auto',
        borderRadius: '0 8px 8px 0',
        width: '40vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 2 }}>
        Login
      </Typography>
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        label='Enter Email'
      />
      <br /><br />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        label='Enter Password'
        type="password"
      />
      <br /><br />
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          label="Role"
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <br /><br />
      <Button
        onClick={handleLogin}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}
      >
        Login
      </Button>
      <Button
        onClick={() => navigate('/signUp')}
        fullWidth
        variant='contained'
        color='error'
      >
        Create new account
      </Button>
    </Paper>
  );
};

export default Login;