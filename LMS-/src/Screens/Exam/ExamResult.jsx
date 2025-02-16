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

const ExamResult = () => {
  const [selectedClass, setSelectedClass] = useState(1);

  // Complete exam results data for classes 1-10 (5 subjects each)
  const examResults = {
    1: [
      { subject: 'Mathematics', marks: '85/100', grade: 'A' },
      { subject: 'English', marks: '78/100', grade: 'B+' },
      { subject: 'Science', marks: '82/100', grade: 'B' },
      { subject: 'History', marks: '88/100', grade: 'A-' },
      { subject: 'Geography', marks: '90/100', grade: 'A' },
    ],
    2: [
      { subject: 'Physics', marks: '92/100', grade: 'A+' },
      { subject: 'Chemistry', marks: '89/100', grade: 'A' },
      { subject: 'Biology', marks: '85/100', grade: 'A' },
      { subject: 'English', marks: '80/100', grade: 'B+' },
      { subject: 'Mathematics', marks: '87/100', grade: 'A-' },
    ],
    3: [
      { subject: 'Mathematics', marks: '75/100', grade: 'B' },
      { subject: 'English', marks: '70/100', grade: 'B-' },
      { subject: 'Science', marks: '78/100', grade: 'B+' },
      { subject: 'History', marks: '80/100', grade: 'B+' },
      { subject: 'Geography', marks: '82/100', grade: 'B+' },
    ],
    4: [
      { subject: 'Physics', marks: '88/100', grade: 'A' },
      { subject: 'Chemistry', marks: '85/100', grade: 'A-' },
      { subject: 'Biology', marks: '90/100', grade: 'A' },
      { subject: 'English', marks: '84/100', grade: 'B+' },
      { subject: 'Mathematics', marks: '86/100', grade: 'A-' },
    ],
    5: [
      { subject: 'Mathematics', marks: '93/100', grade: 'A+' },
      { subject: 'English', marks: '88/100', grade: 'A' },
      { subject: 'Science', marks: '91/100', grade: 'A+' },
      { subject: 'History', marks: '87/100', grade: 'A-' },
      { subject: 'Geography', marks: '89/100', grade: 'A' },
    ],
    6: [
      { subject: 'Physics', marks: '80/100', grade: 'B+' },
      { subject: 'Chemistry', marks: '82/100', grade: 'B' },
      { subject: 'Biology', marks: '78/100', grade: 'B' },
      { subject: 'English', marks: '75/100', grade: 'B-' },
      { subject: 'Mathematics', marks: '83/100', grade: 'B+' },
    ],
    7: [
      { subject: 'Mathematics', marks: '85/100', grade: 'A' },
      { subject: 'English', marks: '80/100', grade: 'B+' },
      { subject: 'Science', marks: '84/100', grade: 'B+' },
      { subject: 'History', marks: '82/100', grade: 'B+' },
      { subject: 'Geography', marks: '88/100', grade: 'A-' },
    ],
    8: [
      { subject: 'Physics', marks: '90/100', grade: 'A' },
      { subject: 'Chemistry', marks: '92/100', grade: 'A+' },
      { subject: 'Biology', marks: '89/100', grade: 'A' },
      { subject: 'English', marks: '85/100', grade: 'A-' },
      { subject: 'Mathematics', marks: '88/100', grade: 'A' },
    ],
    9: [
      { subject: 'Mathematics', marks: '77/100', grade: 'B' },
      { subject: 'English', marks: '73/100', grade: 'B-' },
      { subject: 'Science', marks: '75/100', grade: 'B' },
      { subject: 'History', marks: '78/100', grade: 'B+' },
      { subject: 'Geography', marks: '80/100', grade: 'B+' },
    ],
    10: [
      { subject: 'Physics', marks: '95/100', grade: 'A+' },
      { subject: 'Chemistry', marks: '93/100', grade: 'A+' },
      { subject: 'Biology', marks: '90/100', grade: 'A' },
      { subject: 'English', marks: '88/100', grade: 'A' },
      { subject: 'Mathematics', marks: '92/100', grade: 'A+' },
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
      background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
    }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', textAlign: 'center' }}>
        Exam Results
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
                <TableCell sx={{ color: '#fff' }}>Subject</TableCell>
                <TableCell sx={{ color: '#fff' }}>Marks</TableCell>
                <TableCell sx={{ color: '#fff' }}>Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examResults[selectedClass]?.map((result, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f2f2f2' } }}>
                  <TableCell>{result.subject}</TableCell>
                  <TableCell>{result.marks}</TableCell>
                  <TableCell>{result.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default ExamResult;
