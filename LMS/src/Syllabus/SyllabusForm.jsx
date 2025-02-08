import React, { useState } from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material'
import class1Syllabus from './Class1';
import class2Syllabus from './Class2';
import class3Syllabus from './Class3';
import class4Syllabus from './Class4';
import class5Syllabus from './Class5';
import class6Syllabus from './Class6';
import class7Syllabus from './Class7';
import class8Syllabus from './Class8';
import class9Syllabus from './Class9';
import class10Syllabus from './Class10';

const SyllabusForm = () => {
    const [classNumber, setClassNumber] = useState("");
    const [syllabus, setSyllabus] = useState(null);

    const handleShow = () => {
        // A simple switch case to select the correct syllabus based on classNumber
        switch (classNumber) {
            case "1":
                setSyllabus(class1Syllabus);
                break;
            case "2":
                setSyllabus(class2Syllabus);
                break;
            // add other cases for classes 3 to 10
            case "3":
                setSyllabus(class3Syllabus);
                break;
            case "4":
                setSyllabus(class4Syllabus);
                break;
            case "5":
                setSyllabus(class5Syllabus);
                break;
            case "6":
                setSyllabus(class6Syllabus);
                break;
            case "7":
                setSyllabus(class7Syllabus);
                break;
            case "8":
                setSyllabus(class8Syllabus);
                break;
            case "9":
                setSyllabus(class9Syllabus);
                break;
            case "10":
                setSyllabus(class10Syllabus);
                break;
            default:
                setSyllabus(null);
                break;
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{ width: '40vw', marginX: 'auto', padding: 5, marginY: '15vh' }}
        >
            <Typography
                variant='h5'
                sx={{ textAlign: 'center', marginBottom: 2 }}
            >
                Syllabus Form
            </Typography>
            <TextField
                fullWidth
                label='Name'
            />
            <br /><br />
            <TextField
                fullWidth
                label='Class'
                onChange={(e) => setClassNumber(e.target.value)}
            />
            <br /><br />
            <Button
                onClick={handleShow}
                fullWidth
                variant='contained'
                color='success'
                sx={{ marginBottom: 3 }}>
                Show
            </Button>
            <Button
                fullWidth
                variant='contained'
                color='error'>
                Back
            </Button>
            {syllabus && (
                <div>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Syllabus for Class {classNumber}</Typography>
                    {syllabus.subjects.map((sub, index) => (
                        <div key={index}>
                            <Typography variant="subtitle1">{sub.subject}</Typography>
                            <ul>
                                {sub.topics.map((topic, idx) => (
                                    <li key={idx}>{topic}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

        </Paper>
    )
}

export default SyllabusForm