import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container, Typography } from '@mui/material';

const customers = [
  { id: 1, name: 'Abdullah Kaimkhani', email: 'abdullah@example.com', phone: '555-1234' },
  { id: 2, name: 'Ali Ahmed', email: 'ali@example.com', phone: '555-5678' }
];

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'phone', headerName: 'Phone', width: 150 }
];

export default function CustomerManagement() {
  const [rows, setRows] = useState(customers);

  return (
    <Container style={{ height: 600, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
        <Typography variant="h5">Customer Management</Typography>
        <Button variant="contained" color="primary">
          Add New Customer
        </Button>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </Container>
  );
}