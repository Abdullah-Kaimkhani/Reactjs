import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { feeStructure } from '../Services/feeService';

const StyledCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(2),
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[8],
    },
}));

const FeeCard = ({ classInfo }) => {
    const navigate = useNavigate();

    const handlePaymentRedirect = () => {
        navigate(`/fees/voucher?class=${classInfo.class}&amount=${classInfo.monthly}`);
    };

    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h5" gutterBottom align="center">
                    Class {classInfo.class}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1">Monthly Fee:</Typography>
                    <Typography variant="subtitle1" color="primary">
                        {classInfo.monthly.toLocaleString()}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="subtitle1">Annual Fee:</Typography>
                    <Typography variant="subtitle1" color="secondary">
                        {classInfo.annual.toLocaleString()}
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                    onClick={handlePaymentRedirect}
                >
                    Pay Now
                </Button>
            </CardContent>
        </StyledCard>
    );
};

const FeeStructure = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 4 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
                Fee Structure
            </Typography>

            <Grid container spacing={3}>
                {feeStructure.map((classInfo) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={classInfo.class}>
                        <FeeCard classInfo={classInfo} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FeeStructure;