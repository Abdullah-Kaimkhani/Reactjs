import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

// Import your syllabus files for classes 1 to 10
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

// Create an array with all syllabus objects
const syllabusList = [
  { classNumber: 1, syllabus: class1Syllabus },
  { classNumber: 2, syllabus: class2Syllabus },
  { classNumber: 3, syllabus: class3Syllabus },
  { classNumber: 4, syllabus: class4Syllabus },
  { classNumber: 5, syllabus: class5Syllabus },
  { classNumber: 6, syllabus: class6Syllabus },
  { classNumber: 7, syllabus: class7Syllabus },
  { classNumber: 8, syllabus: class8Syllabus },
  { classNumber: 9, syllabus: class9Syllabus },
  { classNumber: 10, syllabus: class10Syllabus },
];

const SyllabusList = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        Syllabus for All Classes
      </Typography>
      {syllabusList.map(({ classNumber, syllabus }) => (
        <Paper
          key={classNumber}
          elevation={3}
          sx={{ padding: 2, mb: 3, maxWidth: '80%', marginX: 'auto' }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Class {classNumber}
          </Typography>
          {syllabus.subjects.map((subject, idx) => (
            <Box key={idx} sx={{ ml: 2, mb: 1 }}>
              <Typography variant="subtitle1">
                {subject.subject}
              </Typography>
              <ul>
                {subject.topics.map((topic, i) => (
                  <li key={i}>
                    <Typography variant="body2">{topic}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          ))}
        </Paper>
      ))}
    </Box>
  );
};

export default SyllabusList;
