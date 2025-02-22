import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(null); // State to store the current user
  const navigate = useNavigate();

  useEffect(() => {
    // Set up the authentication state observer
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    // Clean up the observer on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchRooms = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'rooms'));
          const roomData = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((room) => room.createdBy === user.uid);
          setRooms(roomData);
        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      };
      fetchRooms();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this room?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'rooms', id));
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
        alert('Room deleted successfully!');
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
  };

  if (user === null) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="room list table">
        <TableHead>
          <TableRow>
            <TableCell>Room No.</TableCell>
            <TableCell align="right">Room Type</TableCell>
            <TableCell align="right">Room Price</TableCell>
            <TableCell align="right">Room Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell component="th" scope="row">
                {room.roomNo}
              </TableCell>
              <TableCell align="right">{room.roomType}</TableCell>
              <TableCell align="right">{room.roomPrice}</TableCell>
              <TableCell align="right">{room.status}</TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => navigate(`/user-dashboard/room/update/${room.id}`)}
                  sx={{ marginLeft: 2 }}
                  endIcon={<EditIcon />}
                  variant="contained"
                >
                  Update
                </Button>
                <Button
                  onClick={() => handleDelete(room.id)}
                  sx={{ marginLeft: 2 }}
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

export default RoomList;
