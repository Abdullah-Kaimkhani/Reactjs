import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Tabs,
  Tab,
  Box
} from '@mui/material';

const ExamSchedule = () => {
  const [selectedClass, setSelectedClass] = useState(1);

  // Complete exam schedule data for classes 1-10 (5 subjects each)
  const examSchedule = {
    1: [
      { date: '2023-11-15', subject: 'Mathematics', time: '9:00 AM - 11:00 AM' },
      { date: '2023-11-16', subject: 'English', time: '11:30 AM - 1:30 PM' },
      { date: '2023-11-17', subject: 'Science', time: '2:00 PM - 4:00 PM' },
      { date: '2023-11-18', subject: 'History', time: '9:00 AM - 11:00 AM' },
      { date: '2023-11-19', subject: 'Geography', time: '11:30 AM - 1:30 PM' },
    ],
    2: [
      { date: '2023-11-15', subject: 'Physics', time: '9:00 AM - 11:00 AM' },
      { date: '2023-11-16', subject: 'Chemistry', time: '11:30 AM - 1:30 PM' },
      { date: '2023-11-17', subject: 'Biology', time: '2:00 PM - 4:00 PM' },
      { date: '2023-11-18', subject: 'English', time: '9:00 AM - 11:00 AM' },
      { date: '2023-11-19', subject: 'Mathematics', time: '11:30 AM - 1:30 PM' },
    ],
    3: [
      { date: '2023-11-20', subject: 'Mathematics', time: '9:00 AM - 11:00 AM' },
      { date: '2023-11-21', subject: 'English', time: '11:30 AM - 1:30 PM' },
      { date: '2023-11-22', subject: 'Science', time: '2:00 PM - 4:00 PM' },
      { date: '2023-11-23', subject: 'History', time: '9:00 AM - 11:00 AM' },
      { date: '2023-11-24', subject: 'Geography', time: '11:30 AM - 1:30 PM' },
    ],
    4: [
      { date: '2023-11-25', subject: 'Physics', time: '9:00 AM - 11:00 AM' },
      { date: '2023-11-26', subject: 'Chemistry', time: '11:30 AM - 1:30 PM' },
      { date: '2023-11-27', subject: 'Biology', time: '2:00 PM - 4:00 PM' },
      { date: '2023-11-28', subject: 'English', time: '9:00 AM - 11:00 AM' },
      { date: '2023-11-29', subject: 'Mathematics', time: '11:30 AM - 1:30 PM' },
    ],
    5: [
      { date: '2023-11-30', subject: 'Mathematics', time: '9:00 AM - 11:00 AM' },
      { date: '2023-12-01', subject: 'English', time: '11:30 AM - 1:30 PM' },
      { date: '2023-12-02', subject: 'Science', time: '2:00 PM - 4:00 PM' },
      { date: '2023-12-03', subject: 'History', time: '9:00 AM - 11:00 AM' },
      { date: '2023-12-04', subject: 'Geography', time: '11:30 AM - 1:30 PM' },
    ],
    6: [
      { date: '2023-12-05', subject: 'Physics', time: '9:00 AM - 11:00 AM' },
      { date: '2023-12-06', subject: 'Chemistry', time: '11:30 AM - 1:30 PM' },
      { date: '2023-12-07', subject: 'Biology', time: '2:00 PM - 4:00 PM' },
      { date: '2023-12-08', subject: 'English', time: '9:00 AM - 11:00 AM' },
      { date: '2023-12-09', subject: 'Mathematics', time: '11:30 AM - 1:30 PM' },
    ],
    7: [
      { date: '2023-12-10', subject: 'Mathematics', time: '9:00 AM - 11:00 AM' },
      { date: '2023-12-11', subject: 'English', time: '11:30 AM - 1:30 PM' },
      { date: '2023-12-12', subject: 'Science', time: '2:00 PM - 4:00 PM' },
      { date: '2023-12-13', subject: 'History', time: '9:00 AM - 11:00 AM' },
      { date: '2023-12-14', subject: 'Geography', time: '11:30 AM - 1:30 PM' },
    ],
    8: [
      { date: '2023-12-15', subject: 'Physics', time: '9:00 AM - 11:00 AM' },
      { date: '2023-12-16', subject: 'Chemistry', time: '11:30 AM - 1:30 PM' },
      { date: '2023-12-17', subject: 'Biology', time: '2:00 PM - 4:00 PM' },
      { date: '2023-12-18', subject: 'English', time: '9:00 AM - 11:00 AM' },
      { date: '2023-12-19', subject: 'Mathematics', time: '11:30 AM - 1:30 PM' },
    ],
    9: [
      { date: '2023-12-20', subject: 'Mathematics', time: '9:00 AM - 11:00 AM' },
      { date: '2023-12-21', subject: 'English', time: '11:30 AM - 1:30 PM' },
      { date: '2023-12-22', subject: 'Science', time: '2:00 PM - 4:00 PM' },
      { date: '2023-12-23', subject: 'History', time: '9:00 AM - 11:00 AM' },
      { date: '2023-12-24', subject: 'Geography', time: '11:30 AM - 1:30 PM' },
    ],
    10: [
      { date: '2023-12-25', subject: 'Physics', time: '9:00 AM - 11:00 AM' },
      { date: '2023-12-26', subject: 'Chemistry', time: '11:30 AM - 1:30 PM' },
      { date: '2023-12-27', subject: 'Biology', time: '2:00 PM - 4:00 PM' },
      { date: '2023-12-28', subject: 'English', time: '9:00 AM - 11:00 AM' },
      { date: '2023-12-29', subject: 'Mathematics', time: '11:30 AM - 1:30 PM' },
    ],
  };

  const handleClassChange = (event, newValue) => {
    setSelectedClass(newValue);
  };

  return (
    <Paper sx={{ 
      p: 3, 
      m: 2, 
      borderRadius: 2, 
      boxShadow: 3, 
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
    }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', textAlign: 'center' }}>
        Exam Schedule
      </Typography>
      
      <Tabs 
        value={selectedClass} 
        onChange={handleClassChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="inherit"
        indicatorColor="secondary"
        sx={{ mb: 3 }}
      >
        {[...Array(10).keys()].map((i) => (
          <Tab key={i+1} label={`Class ${i+1}`} value={i+1} />
        ))}
      </Tabs>

      <Box sx={{ mt: 3 }}>
        <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#3f51b5' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                <TableCell sx={{ color: '#fff' }}>Subject</TableCell>
                <TableCell sx={{ color: '#fff' }}>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examSchedule[selectedClass]?.map((exam, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f2f2f2' } }}>
                  <TableCell>{exam.date}</TableCell>
                  <TableCell>{exam.subject}</TableCell>
                  <TableCell>{exam.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default ExamSchedule;
