import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Chip } from '@mui/material';

const initialRooms = [
  { id: 101, type: 'Standard', status: 'available', price: 100 },
  { id: 102, type: 'Deluxe', status: 'occupied', price: 150 }
];

export default function RoomManagement() {
  const [rooms, setRooms] = useState(initialRooms);

  const getStatusColor = (status) => {
    return status === 'available' ? 'success' : 'error';
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>Room Management</Typography>
      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Room {room.id}</Typography>
                <Typography variant="body1">Type: {room.type}</Typography>
                <Typography variant="body1">Price: ${room.price}/night</Typography>
                <Chip 
                  label={room.status} 
                  color={getStatusColor(room.status)} 
                  style={{ marginTop: '1rem' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}