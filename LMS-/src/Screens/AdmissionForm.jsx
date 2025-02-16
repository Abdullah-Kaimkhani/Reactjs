import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdmissionForm = () => {
  const navigate = useNavigate();
  const [admissionDetails, setAdmissionDetails] = useState({
    name: "",
    fatherName: "",
    studentClass: "",
    email: "",
    phone: "",
    gender: "",
    admissionDate: ""
  });

  const addAdmission = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Swal.fire("Error!", "No user logged in!", "error");
        return;
      }
      // Add admission details to the "students" collection
      await addDoc(collection(db, "students"), {
        ...admissionDetails,
        createdBy: user.uid,
        createdAt: new Date()
      });
      Swal.fire({
        title: "Success!",
        text: "Admission added successfully!",
        icon: "success"
      }).then(() => {
        // Navigate to the StudentList table so the new admission appears there
        navigate('/students/list');
      });
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  return (
    <Paper elevation={3} sx={{ width: '40vw', marginX: 'auto', padding: 5, marginY: '5vh' }}>
      <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 2 }}>
        Admission Form
      </Typography>
      <TextField
        onChange={(e) => setAdmissionDetails({ ...admissionDetails, name: e.target.value })}
        fullWidth
        label='Student Name'
      />
      <br /><br />
      <TextField
        onChange={(e) => setAdmissionDetails({ ...admissionDetails, fatherName: e.target.value })}
        fullWidth
        label="Father's Name"
      />
      <br /><br />
      <TextField
        onChange={(e) => setAdmissionDetails({ ...admissionDetails, studentClass: e.target.value })}
        fullWidth
        label='Class'
      />
      <br /><br />
      <TextField
        onChange={(e) => setAdmissionDetails({ ...admissionDetails, email: e.target.value })}
        fullWidth
        label='Email'
      />
      <br /><br />
      <TextField
        onChange={(e) => setAdmissionDetails({ ...admissionDetails, phone: e.target.value })}
        fullWidth
        label='Phone'
      />
      <br /><br />
      <TextField
        onChange={(e) => setAdmissionDetails({ ...admissionDetails, admissionDate: e.target.value })}
        fullWidth
        label='Admission Date'
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <br /><br />
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          row
          name="gender"
          value={admissionDetails.gender}
          onChange={(e) => setAdmissionDetails({ ...admissionDetails, gender: e.target.value })}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <br /><br />
      <Button
        onClick={addAdmission}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}
      >
        Add Admission
      </Button>
      <Button
        onClick={() => navigate('/students/list')}
        fullWidth
        variant='contained'
        color='error'
      >
        Back
      </Button>
    </Paper>
  );
};

export default AdmissionForm;
