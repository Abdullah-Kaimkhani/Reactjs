import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState({
    roomNo: "",
    roomType: "",
    roomPrice: "",
    status: ""
  });

  // Fetch room data when the component mounts
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const docRef = doc(db, 'rooms', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDetail(docSnap.data());
        } else {
          console.log("No such room!");
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    fetchRoom();
  }, [id]);

  const updateRoom = async () => {
    try {
      const docRef = doc(db, "rooms", id);
      await updateDoc(docRef, detail);
      alert("Room updated successfully!");
      navigate('/user-dashboard/room/list');
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ width: '40vw', marginX: 'auto', padding: 2, height: '88vh' }}>
      <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 1 }}>
        Update Room
      </Typography>
      <TextField
        onChange={(e) => setDetail({ ...detail, roomNo: e.target.value })}
        fullWidth
        label='Room No'
        value={detail.roomNo}
      />
      <br /><br />
      <TextField
        onChange={(e) => setDetail({ ...detail, roomType: e.target.value })}
        fullWidth
        label='Room Type'
        value={detail.roomType}
      />
      <br /><br />
      <TextField
        onChange={(e) => setDetail({ ...detail, roomPrice: e.target.value })}
        fullWidth
        label='Room Price'
        value={detail.roomPrice}
      />
      <br /><br />
      <FormControl component="fieldset" sx={{ marginTop: 2 }}>
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup
          row
          name="status"
          value={detail.status}
          onChange={(e) => setDetail({ ...detail, status: e.target.value })}
        >
          <FormControlLabel value="Available" control={<Radio />} label="Available" />
          <FormControlLabel value="Occupied" control={<Radio />} label="Occupied" />
        </RadioGroup>
      </FormControl>
      <br /><br />
      <Button
        onClick={updateRoom}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}
      >
        Update
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
  );
};

export default UpdateRoom;
