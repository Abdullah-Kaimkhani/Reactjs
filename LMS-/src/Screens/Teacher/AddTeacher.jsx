import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addDoc, collection } from 'firebase/firestore';

const AddTeacher = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    gender: ""
  });

  const addTeacher = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Swal.fire("Error!", "No user logged in!", "error");
        return;
      }
      // Add new document with auto-generated ID to "teachers" collection
      await addDoc(collection(db, "teachers"), {
        ...detail,
        createdBy: user.uid,
        createdAt: new Date()
      });
      Swal.fire({
        title: "Success!",
        text: "Teacher added successfully!",
        icon: "success"
      }).then(() => {
        navigate('/teachers/list');
      });
    } catch (error) {
      console.error("Error adding teacher: ", error);
      Swal.fire("Error!", error.message, "error");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ width: '40vw', marginX: 'auto', padding: 2, height: '88vh' }}
    >
      <Typography
        variant='h5'
        sx={{ textAlign: 'center', marginBottom: 1 }}
      >
        Add Teacher
      </Typography>
      <TextField
        onChange={(e) => setDetail({ ...detail, name: e.target.value })}
        fullWidth
        label='Name'
      />
      <br /><br />
      <TextField
        onChange={(e) => setDetail({ ...detail, subject: e.target.value })}
        fullWidth
        label='Subject'
      />
      <br /><br />
      <TextField
        onChange={(e) => setDetail({ ...detail, email: e.target.value })}
        fullWidth
        label='Email'
      />
      <br /><br />
      <TextField
        onChange={(e) => setDetail({ ...detail, phone: e.target.value })}
        fullWidth
        label='Phone'
      />
      <FormControl component="fieldset" sx={{ marginTop: 2 }}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          row
          name="gender"
          onChange={(e) => setDetail({ ...detail, gender: e.target.value })}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <br /><br />
      <Button
        onClick={addTeacher}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}
      >
        Add
      </Button>
      <Button
        onClick={() => navigate('/teachers/list')}
        fullWidth
        variant='contained'
        color='error'
      >
        Back
      </Button>
    </Paper>
  );
};

export default AddTeacher;
