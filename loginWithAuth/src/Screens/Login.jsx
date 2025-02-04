import React, { useState } from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";
import auth from '../firebaseConfig';
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPasswod] = useState('');
    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    Swal.fire({
      title: "Congratulations!",
      text: "Logged in successfully!",
      icon: "success"
    }).then((result) => {
      // Optionally check if result.isConfirmed if needed:
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  })
  .catch((err) => {
    Swal.fire({
      title: "Error!",
      text: "Invalid email or password",
      icon: "error"
    });
  });
}

  return (
    <Paper
      elevation={3}
      sx={{ width: '40vw', marginX: 'auto', padding: 2, height: '50vh', marginY: 'auto' }}
    >
      <Typography
        variant='h5'
        sx={{ textAlign: 'center', marginBottom: 2 }}
      >
        Login
      </Typography>
      <TextField
      onChange={(e) => setEmail(e.target.value)}
        fullWidth
        label='Enter Email'
      />
      <br /><br />
      <TextField
        onChange={(e) => setPasswod(e.target.value)}
        fullWidth
        label='Enter Password'
      />
      <br /><br />
      <Button
      onClick={loginUser}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}>
        login
      </Button>
      <Button
        onClick={() => navigate('/signUp')}
        fullWidth
        variant='contained'
        color='error'>
        Create new account
      </Button>
    </Paper>
  )
}

export default Login