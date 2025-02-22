import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { auth, db } from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { addDoc, collection } from 'firebase/firestore'

const AddStudent = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    name: "",
    fatherName: "",
    studentClass: "",
    email: "",
    phone: "",
    gender: ""
  })

  const [arr, setArr] = useState([])

  const addUser = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Swal.fire("Error!", "No user logged in!", "error");
        return;
      }

      // Add new document with auto-generated ID
      const docRef = await addDoc(collection(db, "students"), {
        ...detail,
        createdBy: user.uid,  // Store creator's UID
        createdAt: new Date() // Add timestamp
      });

      Swal.fire({
        title: "Success!",
        text: "Student added successfully!",
        icon: "success"
      }).then(() => {
        navigate('/students/list');
      });

    } catch (error) {
      console.error("Error adding document: ", error);
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
        Add Student
      </Typography>
      <TextField
        onChange={(e) => {
          setDetail({ ...detail, name: e.target.value })
        }}
        fullWidth
        label='Name'
      />
      <br /><br />
      <TextField
        onChange={(e) => {
          setDetail({ ...detail, fatherName: e.target.value })
        }}
        fullWidth
        label='Father Name'
      />
      <br /><br />
      <TextField
        onChange={(e) => {
          setDetail({ ...detail, studentClass: e.target.value })
        }}
        fullWidth
        label='Class'
      />
      <br /><br />
      <TextField
        onChange={(e) => {
          setDetail({ ...detail, email: e.target.value })
        }}
        fullWidth
        label='Email'
      />
      <br /><br />
      <TextField
        onChange={(e) => {
          setDetail({ ...detail, phone: e.target.value })
        }}
        fullWidth
        label='Phone'
      />

      <FormControl component="fieldset" sx={{ marginTop: 2 }}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          row
          name="gender"
          onChange={(e) => {
            setDetail({ ...detail, gender: e.target.value })
          }}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <br /><br />
      <Button
        onClick={addUser}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}>
        Add
      </Button>
      <Button
        onClick={() => {
          navigate('/students/list')
        }}
        fullWidth
        variant='contained'
        color='error'>
        Back
      </Button>
    </Paper>
  )
}

export default AddStudent