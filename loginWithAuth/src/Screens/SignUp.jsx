import React, { useState } from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material';
import {createUserWithEmailAndPassword } from "firebase/auth";
import auth from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPasswod] = useState('');
    const createAccount = () => {
        console.log(email, password);
        
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    Swal.fire({
      title: "Congratulations!",
      text: "Account created successfully!",
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
      text: "User already exists",
      icon: "error"
    });
  });
    }
  return (
    <Paper
      elevation={3}
      sx={{ width: '40vw', margin: 'auto', padding: 5 }}
    >
      <Typography
        variant='h5'
        sx={{ textAlign: 'center', marginBottom: 2 }}
      >
        Sign Up
      </Typography>
      <TextField
        fullWidth
        label='Enter Name'
      />
      <br /><br />
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
      onClick={createAccount}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}>
        Create Account
      </Button>
      <Button
        onClick={() => navigate('/')}
        fullWidth
        variant='contained'
        color='error'>
        Already have an account
      </Button>
    </Paper>
  )
}

export default SignUp