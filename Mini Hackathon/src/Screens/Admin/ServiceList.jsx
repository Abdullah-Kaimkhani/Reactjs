import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Set up authentication observer to get the current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch services created by the current user from the "services" collection
  useEffect(() => {
    if (user) {
      const fetchServices = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'services'));
          const serviceData = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((service) => service.createdBy === user.uid);
          setServices(serviceData);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      };
      fetchServices();
    }
  }, [user]);

  // Handle deletion of a service
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this service?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'services', id));
        setServices((prevServices) => prevServices.filter((service) => service.id !== id));
        alert('Service deleted successfully!');
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  if (user === null) {
    return <div>Loading...</div>; // Display loading state while fetching user data
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="service list table">
        <TableHead>
          <TableRow>
            <TableCell>Service ID</TableCell>
            <TableCell>Service Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.serviceID}</TableCell>
              <TableCell>{service.serviceType}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell>
                <Button
                  onClick={() => navigate(`/service/update/${service.id}`)}
                  variant="contained"
                  sx={{ marginRight: 2 }}
                  endIcon={<EditIcon />}
                >
                  Update
                </Button>
                <Button
                  onClick={() => handleDelete(service.id)}
                  variant="contained"
                  color="error"
                  endIcon={<DeleteIcon />}
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

export default ServiceList;
