import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {db} from '../../firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'

const Update = () => {
    const navigate= useNavigate();
    const { id } = useParams();
    const [detail, setDetail] = useState({
        name: '',
        fatherName: '',
        class: '',
        email: '',
        phone: '',
        gender: ''
    });

        const getData = async () => {
            const getData = await getDoc(doc(db, 'users', userCredential.user.uid));
            console.log(getData.data());
        };


    const updateUser = async () => {
        try {
            const docRef = doc(db, "students", id);
            await updateDoc(docRef, detail);
            alert("Student updated successfully!");
            navigate('/students/list');
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{ width: '40vw', marginX: 'auto', padding: 2, height: '88vh' }}
        >
            <Typography
                variant='h5'
                sx={{ textAlign: 'center', marginBottom: 1 }}
            >
                Update Student
            </Typography>
            <TextField
                onChange={(e) => {
                    setDetail({ ...detail, name: e.target.value })
                }}
                fullWidth
                label='Name'
                value={detail.name}
            />
            <br /><br />
            <TextField
                onChange={(e) => {
                    setDetail({ ...detail, fatherName: e.target.value })
                }}
                fullWidth
                label='Father Name'
                value={detail.fatherName}
            />
            <br /><br />
            <TextField
                onChange={(e) => {
                    setDetail({ ...detail, class: e.target.value })
                }}
                fullWidth
                label='Class'
                value={detail.studentClass}
            />
            <br /><br />
            <TextField
                onChange={(e) => {
                    setDetail({ ...detail, email: e.target.value })
                }}
                fullWidth
                label='Email'
                value={detail.email}
            />
            <br /><br />
            <TextField
                onChange={(e) => {
                    setDetail({ ...detail, phone: e.target.value })
                }}
                fullWidth
                label='Phone'
                value={detail.phone}
            />

            <FormControl component="fieldset" sx={{ marginTop: 2 }}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                    row
                    name="gender"
                    value={detail.gender}
                    onChange={(e) => {
                        setDetail({ ...detail, gender: e.target.value })
                    }}
                >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
            </FormControl>
            <br /><br />
            <Button
                onClick={updateUser}
                fullWidth
                variant='contained'
                color='success'
                sx={{ marginBottom: 3 }}>
                Update
            </Button>
            <Button
                onClick={() => {
                    navigate('/students/list')
                }}
                fullWidth
                variant='contained'
                color='error'>
                Back
            </Button>
        </Paper>
    )
}

export default Update;