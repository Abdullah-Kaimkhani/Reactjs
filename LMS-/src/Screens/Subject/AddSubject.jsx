import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { db, auth } from '../../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddSubject = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phone: '',
    gender: ''
  });
  const navigate = useNavigate();

  const createSubject = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Swal.fire("Error!", "No user logged in!", "error");
        return;
      }
      await addDoc(collection(db, "subjects"), {
        ...userDetails,
        createdBy: user.uid,
        createdAt: new Date()
      });
      Swal.fire("Success!", "Subject added successfully!", "success")
        .then(() => {
          navigate('/subjects/list');
        });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ width: '40vw', marginX: 'auto', padding: 5, marginY: '5vh' }}
    >
      <Typography
        variant='h5'
        sx={{ textAlign: 'center', marginBottom: 2 }}
      >
        Add Subject
      </Typography>
      <TextField
        onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
        fullWidth
        label='Name'
      />
      <br /><br />
      <TextField
        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
        fullWidth
        label='Subject'
      />
      <br /><br />
      <TextField
        onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
        fullWidth
        label='Class'
      />
      <FormControl component="fieldset" sx={{ marginTop: 2 }}>
        <FormLabel component="legend">Select Group</FormLabel>
        <RadioGroup
          row
          name="selectGroup"
          value={userDetails.gender}
          onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
        >
          <FormControlLabel value="Pre-Engineering" control={<Radio />} label="Pre-Engineering" />
          <FormControlLabel value="Pre-Medical" control={<Radio />} label="Pre-Medical" />
        </RadioGroup>
      </FormControl>
      <br /><br />
      <Button
        onClick={createSubject}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}
      >
        Add
      </Button>
      <Button
        onClick={() => navigate('/')}
        fullWidth
        variant='contained'
        color='error'
      >
        Back
      </Button>
    </Paper>
  );
};

export default AddSubject;
