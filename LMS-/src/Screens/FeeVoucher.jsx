import React, { useEffect, useState } from 'react';
import {
    Button,
    Paper,
    TextField,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getFeeByClass } from '../Services/feeService';
import Swal from 'sweetalert2';

const FeeVoucher = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [userDetails, setUserDetails] = useState({
        name: '',
        fatherName: '',
        class: '',
        amount: ''
    });

    useEffect(() => {
        const classParam = searchParams.get('class');
        const amountParam = searchParams.get('amount');

        if (classParam && amountParam) {
            setUserDetails(prev => ({
                ...prev,
                class: classParam,
                amount: amountParam
            }));
        }
    }, [searchParams]);

    const handleClassChange = (e) => {
        const selectedClass = e.target.value;
        const fee = getFeeByClass(selectedClass);

        setUserDetails(prev => ({
            ...prev,
            class: selectedClass,
            amount: fee ? fee.monthly.toString() : ''
        }));
    };

    const PaymentSubmit = () => {
        Swal.fire({
            title: "Success!",
            text: "Student added successfully!",
            icon: "success"
        }).then(() => {
            navigate('/dashboard');
        });
    }

    return (
        <Paper elevation={3} sx={{ width: '40vw', marginX: 'auto', padding: 5 }}>
            <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 2 }}>
                Fee Voucher
            </Typography>

            <TextField
                fullWidth
                label='Student Name'
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Father's Name"
                value={userDetails.fatherName}
                onChange={(e) => setUserDetails({ ...userDetails, fatherName: e.target.value })}
                sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Class</InputLabel>
                <Select
                    value={userDetails.class}
                    label="Class"
                    onChange={handleClassChange}
                    required
                >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((cls) => (
                        <MenuItem key={cls} value={cls}>
                            Class {cls}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label='Amount'
                value={userDetails.amount}
                InputProps={{
                    readOnly: true,
                }}
                sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Payment Method</InputLabel>
                <Select
                    value={paymentMethod}
                    label="Payment Method"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                >
                    {['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Cheque'].map((method) => (
                        <MenuItem key={method} value={method}>
                            {method}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                fullWidth
                variant='contained'
                color='success'
                sx={{ marginBottom: 3 }}
                onClick={PaymentSubmit}
            >
                Submit Payment
            </Button>

            <Button
                fullWidth
                variant='contained'
                color='error'
                onClick={() => navigate('/')}
            >
                Back
            </Button>
        </Paper>
    );
};

export default FeeVoucher;