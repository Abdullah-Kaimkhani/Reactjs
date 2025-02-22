import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Set up the authentication state observer
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch bookings created by the current user
  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'booking'));
          const bookingData = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((booking) => booking.createdBy === user.uid); // Only show bookings created by the user
          setBookings(bookingData);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };
      fetchBookings();
    }
  }, [user]);

  // Handle deletion of a booking
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'booking', id));
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
        alert('Booking deleted successfully!');
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  if (user === null) {
    return <div>Loading...</div>; // or a spinner
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="booking list table">
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell>Room ID</TableCell>
            <TableCell>Booking Date</TableCell>
            <TableCell>Check-In Date</TableCell>
            <TableCell>Check-Out Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.bookingID}</TableCell>
              <TableCell>{booking.customerID}</TableCell>
              <TableCell>{booking.roomID}</TableCell>
              <TableCell>{booking.bookingDate}</TableCell>
              <TableCell>{booking.checkInDate}</TableCell>
              <TableCell>{booking.checkOutDate}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>
                <Button
                  onClick={() => navigate(`/booking/update/${booking.id}`)}
                  sx={{ marginRight: 2 }}
                  endIcon={<EditIcon />}
                  variant="contained"
                >
                  Update
                </Button>
                <Button
                  onClick={() => handleDelete(booking.id)}
                  endIcon={<DeleteIcon />}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingList;
