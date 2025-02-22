import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addDoc, collection } from 'firebase/firestore';

const AddRoom = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    roomNo: "",
    roomType: "",
    roomPrice: "",
    status: "",
  });

  const addRoom = async () => {
    try {
      const user = auth.currentUser;

      // Add new document with auto-generated ID
      const docRef = await addDoc(collection(db, "rooms"), {
        ...room,
        createdBy: user.uid,  // Store creator's UID
        createdAt: new Date() // Add timestamp
      });

      Swal.fire({
        title: "Success!",
        text: "Room added successfully!",
        icon: "success"
      }).then(() => {
        navigate('/user-dashboard/room/list'); // Absolute path to room list
      });

    } catch (error) {
      console.error("Error adding document: ", error);
      Swal.fire("Error!", error.message, "error");
    }
  };

  return (
    <>
      <Button onClick={() => navigate('/user-dashboard/room/list')} variant='outlined'>
        View Rooms
      </Button>
      <Paper
        elevation={3}
        sx={{ width: '40vw', marginX: 'auto', padding: 2, height: '65vh' }}
      >
        <Typography
          variant='h5'
          sx={{ textAlign: 'center', marginBottom: 1 }}
        >
          Add Room
        </Typography>
        <TextField
          value={room.roomNo}
          onChange={(e) => setRoom({ ...room, roomNo: e.target.value })}
          fullWidth
          label='Room No.'
        />
        <br /><br />
        <TextField
          value={room.roomType}
          onChange={(e) => setRoom({ ...room, roomType: e.target.value })}
          fullWidth
          label='Room Type'
        />
        <br /><br />
        <TextField
          value={room.roomPrice}
          onChange={(e) => setRoom({ ...room, roomPrice: e.target.value })}
          fullWidth
          label='Price'
        />
        <br /><br />
        <FormControl component="fieldset" sx={{ marginTop: 2 }}>
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup
            row
            name="status"
            value={room.status}
            onChange={(e) => setRoom({ ...room, status: e.target.value })}
          >
            <FormControlLabel value="Available" control={<Radio />} label="Available" />
            <FormControlLabel value="Occupied" control={<Radio />} label="Occupied" />
          </RadioGroup>
        </FormControl>
        <br /><br />
        <Button
          onClick={addRoom}
          fullWidth
          variant='contained'
          color='success'
          sx={{ marginBottom: 3 }}
        >
          Add
        </Button>
        <Button
          onClick={() => navigate('/user-dashboard/room/list')}
          fullWidth
          variant='contained'
          color='error'
        >
          Back
        </Button>
      </Paper>
    </>
  );
};

export default AddRoom;
