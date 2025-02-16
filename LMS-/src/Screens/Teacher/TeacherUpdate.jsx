import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

const TeacherUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    gender: ''
  });

  useEffect(() => {
    fetchTeacher();
  }, []);

  const fetchTeacher = async () => {
    try {
      const docRef = doc(db, "teachers", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDetail(docSnap.data());
      } else {
        console.log("No such teacher!");
      }
    } catch (error) {
      console.error("Error fetching teacher:", error);
    }
  };

  const updateTeacher = async () => {
    try {
      const docRef = doc(db, "teachers", id);
      await updateDoc(docRef, detail);
      alert("Teacher updated successfully!");
      navigate('/teachers/list');
    } catch (error) {
      console.error("Error updating teacher:", error);
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
        Update Teacher
      </Typography>
      <TextField
        onChange={(e) => setDetail({ ...detail, name: e.target.value })}
        fullWidth
        label='Name'
        value={detail.name}
      />
      <br /><br />
      <TextField
        onChange={(e) => setDetail({ ...detail, subject: e.target.value })}
        fullWidth
        label='Subject'
        value={detail.subject}
      />
      <br /><br />
      <TextField
        onChange={(e) => setDetail({ ...detail, email: e.target.value })}
        fullWidth
        label='Email'
        value={detail.email}
      />
      <br /><br />
      <TextField
        onChange={(e) => setDetail({ ...detail, phone: e.target.value })}
        fullWidth
        label='Phone'
        value={detail.phone}
      />
      <FormControl component="fieldset" sx={{ marginTop: 2 }}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          row
          name="gender"
          value={detail.gender}
          onChange={(e) => setDetail({ ...detail, gender: e.target.value })}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <br /><br />
      <Button
        onClick={updateTeacher}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}
      >
        Update
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

export default TeacherUpdate;
