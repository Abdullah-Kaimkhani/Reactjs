import { Button, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { db, auth } from '../../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ClassForm = () => {
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState({
    className: '',
    section: '',
    teacher: '',
    roomNumber: '',
    schedule: ''
  });

  const createClass = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Swal.fire("Error!", "No user logged in!", "error");
        return;
      }
      await addDoc(collection(db, "classes"), {
        ...classDetails,
        createdBy: user.uid,
        createdAt: new Date()
      });
      Swal.fire("Success!", "Class added successfully!", "success").then(() => {
        navigate('/class/list');
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <Paper elevation={3} sx={{ width: '40vw', marginX: 'auto', padding: 5 }}>
      <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 2 }}>
        Class Form
      </Typography>
      <TextField
        onChange={(e) =>
          setClassDetails({ ...classDetails, className: e.target.value })
        }
        fullWidth
        label='Class Name'
      />
      <br /><br />
      <TextField
        onChange={(e) =>
          setClassDetails({ ...classDetails, section: e.target.value })
        }
        fullWidth
        label='Section'
      />
      <br /><br />
      <TextField
        onChange={(e) =>
          setClassDetails({ ...classDetails, teacher: e.target.value })
        }
        fullWidth
        label='Class Teacher'
      />
      <br /><br />
      <TextField
        onChange={(e) =>
          setClassDetails({ ...classDetails, roomNumber: e.target.value })
        }
        fullWidth
        label='Room Number'
      />
      <br /><br />
      <TextField
        onChange={(e) =>
          setClassDetails({ ...classDetails, schedule: e.target.value })
        }
        fullWidth
        label='Schedule'
      />
      <br /><br />
      <Button
        onClick={createClass}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}
      >
        Add
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

export default ClassForm;
