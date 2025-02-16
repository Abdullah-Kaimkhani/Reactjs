import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

const SubjectUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [details, setDetails] = useState({
    username: '',
    email: '',
    phone: '',
    gender: ''
  });

  useEffect(() => {
    fetchSubject();
  }, []);

  const fetchSubject = async () => {
    try {
      const docRef = doc(db, "subjects", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDetails(docSnap.data());
      } else {
        console.log("No such subject!");
      }
    } catch (error) {
      console.error("Error fetching subject:", error);
    }
  };

  const updateSubject = async () => {
    try {
      const docRef = doc(db, "subjects", id);
      await updateDoc(docRef, details);
      alert("Subject updated successfully!");
      navigate('/subjects/list');
    } catch (error) {
      console.error("Error updating subject:", error);
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
        Update Subject
      </Typography>
      <TextField
        onChange={(e) => setDetails({ ...details, username: e.target.value })}
        fullWidth
        label='Name'
        value={details.username}
      />
      <br /><br />
      <TextField
        onChange={(e) => setDetails({ ...details, email: e.target.value })}
        fullWidth
        label='Subject'
        value={details.email}
      />
      <br /><br />
      <TextField
        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
        fullWidth
        label='Class'
        value={details.phone}
      />
      <FormControl component="fieldset" sx={{ marginTop: 2 }}>
        <FormLabel component="legend">Select Group</FormLabel>
        <RadioGroup
          row
          name="selectGroup"
          value={details.gender}
          onChange={(e) => setDetails({ ...details, gender: e.target.value })}
        >
          <FormControlLabel value="Pre-Engineering" control={<Radio />} label="Pre-Engineering" />
          <FormControlLabel value="Pre-Medical" control={<Radio />} label="Pre-Medical" />
        </RadioGroup>
      </FormControl>
      <br /><br />
      <Button
        onClick={updateSubject}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}
      >
        Update
      </Button>
      <Button
        onClick={() => navigate('/subjects/list')}
        fullWidth
        variant='contained'
        color='error'
      >
        Back
      </Button>
    </Paper>
  );
};

export default SubjectUpdate;
