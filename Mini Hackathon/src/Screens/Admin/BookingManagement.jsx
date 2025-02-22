import { Button, TextField, Paper, Typography, Grid, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth, db } from '../../firebaseConfig';

const BookingManagement = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    bookingID: "",
    customerID: "",
    roomID: "",
    bookingDate: "",
    checkInDate: "",
    checkOutDate: "",
    status: "",
  });

  const handleSubmit = async() => {
    try {
      if (Object.values(booking).includes("")) {
        Swal.fire("Error!", "Please fill in all fields.", "error");
        return;
      }
      const user = auth.currentUser;
      const docRef = await addDoc(collection(db, "booking"), {
        ...booking,
        createdBy: user.uid,  // Store creator's UID
        createdAt: new Date() // Add timestamp
      });
      
      // Submit booking logic here
      console.log(booking);

      Swal.fire({
        title: "Success!",
        text: "Booking created successfully!",
        icon: "success"
      }).then(() => {
        navigate('/user-dashboard/booking/list'); // Navigate after success
      });

    } catch (error) {
      console.error("Error submitting booking: ", error);
      Swal.fire("Error!", error.message, "error");
    }
  };

  return (
            <>
            <Button onClick={() => navigate('/user-dashboard/booking/list')} variant='outlined'>
                    View Bookings
                  </Button>
      <Paper elevation={3} sx={{ width: '60vw', marginX: 'auto', padding: 3, height: '65vh' }}>
      <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 3 }}>Hotel Room Booking</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            value={booking.bookingID}
            onChange={(e) => setBooking({ ...booking, bookingID: e.target.value })}
            fullWidth
            label="Booking ID"
            />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            value={booking.customerID}
            onChange={(e) => setBooking({ ...booking, customerID: e.target.value })}
            fullWidth
            label="Customer ID"
            />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            value={booking.roomID}
            onChange={(e) => setBooking({ ...booking, roomID: e.target.value })}
            fullWidth
            label="Room ID"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            value={booking.bookingDate}
            onChange={(e) => setBooking({ ...booking, bookingDate: e.target.value })}
            fullWidth
            label="Booking Date"
            InputLabelProps={{ shrink: true }}
            />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            value={booking.checkInDate}
            onChange={(e) => setBooking({ ...booking, checkInDate: e.target.value })}
            fullWidth
            label="Check-in Date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            value={booking.checkOutDate}
            onChange={(e) => setBooking({ ...booking, checkOutDate: e.target.value })}
            fullWidth
            label="Check-out Date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Status</FormLabel>
            <RadioGroup
              row
              name="status"
              value={booking.status}
              onChange={(e) => setBooking({ ...booking, status: e.target.value })}
            >
              <FormControlLabel value="Confirmed" control={<Radio />} label="Confirmed" />
              <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
              <FormControlLabel value="Cancelled" control={<Radio />} label="Cancelled" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="success"
          >
            Submit Booking
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={() => navigate('/user-dashboard/booking/list')}
            fullWidth
            variant="outlined"
            color="error"
          >
            Back to Booking List
          </Button>
        </Grid>
      </Grid>
    </Paper>
    </>
  );
};

export default BookingManagement;
