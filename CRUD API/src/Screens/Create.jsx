import { Button, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Create = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: '',
    name: '',
    email: '',
    phone: ''
  });

  const createUser = () => {
    axios.post('http://localhost:3000/users', userDetails)
      .then((res) => {
        Swal.fire({
          title: "Congratulations!",
          text: "User created successfully!",
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
          text: "An error occurred!",
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
        Create User
      </Typography>
      <TextField
        onChange={(e) => {
          setUserDetails({ ...userDetails, username: e.target.value })
        }}
        fullWidth
        label='Enter Username'
      />
      <br /><br />
      <TextField
        onChange={(e) => {
          setUserDetails({ ...userDetails, name: e.target.value })
        }}
        fullWidth
        label='Enter Name'
      />
      <br /><br />
      <TextField
        onChange={(e) => {
          setUserDetails({ ...userDetails, email: e.target.value })
        }}
        fullWidth
        label='Enter Email'
      />
      <br /><br />
      <TextField
        onChange={(e) => {
          setUserDetails({ ...userDetails, phone: e.target.value })
        }}
        fullWidth
        label='Enter Phone'
      />
      <br /><br />
      <Button
        onClick={createUser}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}>
        Create
      </Button>
      <Button
        onClick={() => {
          navigate('/')
        }}
        fullWidth
        variant='contained'
        color='error'>
        Back
      </Button>
    </Paper>
  );
}

export default Create;
