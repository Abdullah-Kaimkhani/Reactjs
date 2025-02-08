import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React from 'react'

const ClassForm = () => {
    return (
        <Paper
            elevation={3}
            sx={{ width: '40vw', marginX: 'auto', padding: 5 }}
        >
            <Typography
                variant='h5'
                sx={{ textAlign: 'center', marginBottom: 2 }}
            >
                Class Form
            </Typography>
            <TextField
                onChange={(e) => {
                    setUserDetails({ ...userDetails, username: e.target.value })
                }}
                fullWidth
                label='Name'
            />
            <br /><br />
            <TextField
                onChange={(e) => {
                    setUserDetails({ ...userDetails, name: e.target.value })
                }}
                fullWidth
                label='Father Name'
            />
            <br /><br />
            <TextField
                onChange={(e) => {
                    setUserDetails({ ...userDetails, email: e.target.value })
                }}
                fullWidth
                label='Class'
            />
            <br /><br />
            <TextField
                onChange={(e) => {
                    setUserDetails({ ...userDetails, email: e.target.value })
                }}
                fullWidth
                label='Email'
            />
            <br /><br />
            <TextField
                onChange={(e) => {
                    setUserDetails({ ...userDetails, phone: e.target.value })
                }}
                fullWidth
                label='Phone'
            />
            <br /><br />
            <TextField
                onChange={(e) => {
                    setUserDetails({ ...userDetails, dob: e.target.value })
                }}
                fullWidth
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
            />
            {/* Add Date of Birth here */}
            <FormControl component="fieldset" sx={{ marginTop: 2 }}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                    row
                    name="gender"
                    // value={userDetails.gender}
                    onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
                >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
            </FormControl>
            <br /><br />
            <Button
                // onClick={createUser}
                fullWidth
                variant='contained'
                color='success'
                sx={{ marginBottom: 3 }}>
                Add
            </Button>
            <Button
                onClick={() => {
                    navigate('/')
                }}
                fullWidth
                variant='contained'
                color='error'>
                Back
            </Button>
        </Paper>
    )
}

export default ClassForm