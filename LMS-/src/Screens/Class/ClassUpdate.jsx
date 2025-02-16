import React, { useEffect, useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

const ClassUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState({
    className: '',
    section: '',
    teacher: '',
    roomNumber: '',
    schedule: ''
  });

  useEffect(() => {
    fetchClass();
  }, []);

  const fetchClass = async () => {
    try {
      const docRef = doc(db, "classes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setClassDetails(docSnap.data());
      } else {
        console.log("No such class!");
      }
    } catch (error) {
      console.error("Error fetching class:", error);
    }
  };

  const updateClass = async () => {
    try {
      const docRef = doc(db, "classes", id);
      await updateDoc(docRef, classDetails);
      alert("Class updated successfully!");
      navigate('/class/list');
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ width: '40vw', marginX: 'auto', padding: 2, height: '88vh' }}>
      <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 1 }}>
        Update Class
      </Typography>
      <TextField
        onChange={(e) => setClassDetails({ ...classDetails, className: e.target.value })}
        fullWidth
        label='Class Name'
        value={classDetails.className}
      />
      <br /><br />
      <TextField
        onChange={(e) => setClassDetails({ ...classDetails, section: e.target.value })}
        fullWidth
        label='Section'
        value={classDetails.section}
      />
      <br /><br />
      <TextField
        onChange={(e) => setClassDetails({ ...classDetails, teacher: e.target.value })}
        fullWidth
        label='Class Teacher'
        value={classDetails.teacher}
      />
      <br /><br />
      <TextField
        onChange={(e) => setClassDetails({ ...classDetails, roomNumber: e.target.value })}
        fullWidth
        label='Room Number'
        value={classDetails.roomNumber}
      />
      <br /><br />
      <TextField
        onChange={(e) => setClassDetails({ ...classDetails, schedule: e.target.value })}
        fullWidth
        label='Schedule'
        value={classDetails.schedule}
      />
      <br /><br />
      <Button
        onClick={updateClass}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}
      >
        Update
      </Button>
      <Button
        onClick={() => navigate('/class/list')}
        fullWidth
        variant='contained'
        color='error'
      >
        Back
      </Button>
    </Paper>
  );
};

export default ClassUpdate;
