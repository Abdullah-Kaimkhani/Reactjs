import { Button, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addDoc, collection } from 'firebase/firestore';

const Service = () => {
  const navigate = useNavigate();
  const [service, setService] = useState({
    serviceID: "",
    serviceType: "",
    description: "",
    price: "",
  });

  const addService = async () => {
    try {
      // Validate that all fields are filled
      if (Object.values(service).includes("")) {
        Swal.fire("Error!", "Please fill in all fields.", "error");
        return;
      }
      const user = auth.currentUser;
      // Add a new document to the "services" collection
      await addDoc(collection(db, "services"), {
        ...service,
        createdBy: user.uid,  // Store the creator's UID
        createdAt: new Date() // Timestamp of creation
      });

      Swal.fire({
        title: "Success!",
        text: "Service added successfully!",
        icon: "success"
      }).then(() => {
        navigate('/user-dashboard/service/list'); // Navigate to the service list
      });
    } catch (error) {
      console.error("Error adding service: ", error);
      Swal.fire("Error!", error.message, "error");
    }
  };

  return (
    <>
      <Button onClick={() => navigate('/user-dashboard/service/list')} variant='outlined'>
        View Services
      </Button>
      <Paper elevation={3} sx={{ width: '40vw', marginX: 'auto', padding: 2, height: '65vh' }}>
        <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 1 }}>
          Add Service
        </Typography>
        <TextField
          value={service.serviceID}
          onChange={(e) => setService({ ...service, serviceID: e.target.value })}
          fullWidth
          label='Service ID'
        />
        <br /><br />
        <TextField
          value={service.serviceType}
          onChange={(e) => setService({ ...service, serviceType: e.target.value })}
          fullWidth
          label='Service Type'
        />
        <br /><br />
        <TextField
          value={service.description}
          onChange={(e) => setService({ ...service, description: e.target.value })}
          fullWidth
          label='Description'
          multiline
          rows={4}
          helperText="Details additional services offered by the hotel (e.g., room service, laundry)"
        />
        <br /><br />
        <TextField
          value={service.price}
          onChange={(e) => setService({ ...service, price: e.target.value })}
          fullWidth
          label='Price'
          type="number"
        />
        <br /><br />
        <Button
          onClick={addService}
          fullWidth
          variant='contained'
          color='success'
          sx={{ marginBottom: 3 }}
        >
          Add
        </Button>
        <Button
          onClick={() => navigate('/user-dashboard/service/list')}
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

export default Service;
