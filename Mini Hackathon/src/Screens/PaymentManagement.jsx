import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Chip, Button } from '@mui/material';

const payments = [
  { id: 1, bookingId: 'B001', amount: 200, status: 'Paid', method: 'Credit Card' },
];

const columns = [
  { field: 'bookingId', headerName: 'Booking ID', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 150 },
  { field: 'method', headerName: 'Payment Method', width: 150 },
  { field: 'status', headerName: 'Status', width: 150, renderCell: (params) => (
    <Chip 
      label={params.value} 
      color={params.value === 'Paid' ? 'success' : 'error'} 
    />
  )}
];

export default function PaymentManagement() {
  return (
    <Container style={{ height: 600, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
        <h2>Payment Management</h2>
        <Button variant="contained" color="primary">
          Record Payment
        </Button>
      </div>
      <DataGrid
        rows={payments}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </Container>
  );
}