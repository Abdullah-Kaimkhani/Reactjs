import { Button, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState({
    username: '',
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`).then((res) => {
      setUserDetails(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [])

  const updateUser = () => {
    axios.put(`http://localhost:3000/users/${id}`, userDetails)
      .then((res) => {
        Swal.fire({
          title: "Good job!",
          text: "User updated successfully!",
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
        Update User
      </Typography>
      <TextField
        value={userDetails.username}
        onChange={(e) => {
          setUserDetails({ ...userDetails, username: e.target.value })
        }}
        fullWidth
        label='Enter Username'
      />
      <br /><br />
      <TextField
        value={userDetails.name}
        onChange={(e) => {
          setUserDetails({ ...userDetails, name: e.target.value })
        }}
        fullWidth
        label='Enter Name'
      />
      <br /><br />
      <TextField
        value={userDetails.email}
        onChange={(e) => {
          setUserDetails({ ...userDetails, email: e.target.value })
        }}
        fullWidth
        label='Enter Email'
      />
      <br /><br />
      <TextField
        value={userDetails.phone}
        onChange={(e) => {
          setUserDetails({ ...userDetails, phone: e.target.value })
        }}
        fullWidth
        label='Enter Phone'
      />
      <br /><br />
      <Button
        onClick={updateUser}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}>
        Update
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

export default Update;
