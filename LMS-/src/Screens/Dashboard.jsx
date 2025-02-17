import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  styled, 
  Stack, 
  Button,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  PeopleAlt,
  Class,
  Assignment,
  Schedule,
  School,
  EventNote,
  NotificationsActive
} from '@mui/icons-material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

// Custom styled components
const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '15px',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)'
  }
}));

const QuickActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 500,
  width: '100%'
}));

const Dashboard = () => {
  // Demo static stats
  const stats = {
    students: 1245,
    teachers: 45,
    courses: 32,
    revenue: '2,45,000'
  };

  // Demo recent students data
  const recentStudents = [
    { name: 'Abdullah Kaimkhani', class: 'X-A', progress: 75 },
    { name: 'Wasif', class: 'IX-B', progress: 60 },
    { name: 'Hasan', class: 'IX-C', progress: 90 }
  ];

  const upcomingEvents = [
    { title: 'Quarterly Exams', date: '15 Mar 2024' },
    { title: 'Parent-Teacher Meeting', date: '20 Mar 2024' },
    { title: 'Sports Day', date: '25 Mar 2024' }
  ];

  // State for the dynamic chart data
  const [classDistribution, setClassDistribution] = useState([]);

  // Define colors for the chart slices
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  useEffect(() => {
    async function fetchStudents() {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("No user logged in!");
          return;
        }
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentsData = querySnapshot.docs
          .map(doc => doc.data())
          .filter(student => student.createdBy === user.uid);
        
        // Calculate distribution of students by their class field
        const distribution = {};
        studentsData.forEach(student => {
          const classVal = student.studentClass;
          if (classVal) {
            distribution[classVal] = (distribution[classVal] || 0) + 1;
          }
        });
        const chartData = Object.keys(distribution).map(key => ({
          name: key,
          value: distribution[key]
        }));
        setClassDistribution(chartData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }
    fetchStudents();
  }, []);

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 4, 
          color: '#2c3e50',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <School fontSize="large" /> Welcome to SmartEdu LMS
      </Typography>

      {/* Quick Stats Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard elevation={3} sx={{ borderLeft: '4px solid #3498db' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <PeopleAlt sx={{ fontSize: 40, color: '#3498db' }} />
              <div>
                <Typography variant="h5">{stats.students}</Typography>
                <Typography variant="body2">Total Students</Typography>
              </div>
            </Stack>
          </SummaryCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard elevation={3} sx={{ borderLeft: '4px solid #e74c3c' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <School sx={{ fontSize: 40, color: '#e74c3c' }} />
              <div>
                <Typography variant="h5">{stats.teachers}</Typography>
                <Typography variant="body2">Faculty Members</Typography>
              </div>
            </Stack>
          </SummaryCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard elevation={3} sx={{ borderLeft: '4px solid #2ecc71' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Class sx={{ fontSize: 40, color: '#2ecc71' }} />
              <div>
                <Typography variant="h5">{stats.courses}</Typography>
                <Typography variant="body2">Active Courses</Typography>
              </div>
            </Stack>
          </SummaryCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard elevation={3} sx={{ borderLeft: '4px solid #9b59b6' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Assignment sx={{ fontSize: 40, color: '#9b59b6' }} />
              <div>
                <Typography variant="h5">{stats.revenue}</Typography>
                <Typography variant="body2">Monthly Revenue</Typography>
              </div>
            </Stack>
          </SummaryCard>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Quick Actions */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <QuickActionButton 
                variant="contained" 
                startIcon={<PeopleAlt />}
                sx={{ bgcolor: '#3498db', '&:hover': { bgcolor: '#2980b9' } }}
              >
                Add Student
              </QuickActionButton>
            </Grid>
            <Grid item xs={6} sm={3}>
              <QuickActionButton 
                variant="contained" 
                startIcon={<School />}
                sx={{ bgcolor: '#e74c3c', '&:hover': { bgcolor: '#c0392b' } }}
              >
                Manage Courses
              </QuickActionButton>
            </Grid>
            <Grid item xs={6} sm={3}>
              <QuickActionButton 
                variant="contained" 
                startIcon={<Schedule />}
                sx={{ bgcolor: '#2ecc71', '&:hover': { bgcolor: '#27ae60' } }}
              >
                View Schedule
              </QuickActionButton>
            </Grid>
            <Grid item xs={6} sm={3}>
              <QuickActionButton 
                variant="contained" 
                startIcon={<NotificationsActive />}
                sx={{ bgcolor: '#9b59b6', '&:hover': { bgcolor: '#8e44ad' } }}
              >
                Notifications
              </QuickActionButton>
            </Grid>
          </Grid>

          {/* Recent Students */}
          <Paper elevation={3} sx={{ p: 3, borderRadius: '15px', mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Recent Student Activity
            </Typography>
            {recentStudents.map((student, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: '#3498db' }}>{student.name[0]}</Avatar>
                  <div style={{ flexGrow: 1 }}>
                    <Typography variant="body1">{student.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {student.class}
                    </Typography>
                  </div>
                  <LinearProgress 
                    variant="determinate" 
                    value={student.progress} 
                    sx={{ 
                      width: '100px',
                      height: '8px',
                      borderRadius: '4px',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: '4px'
                      }
                    }}
                  />
                </Stack>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Upcoming Events */}
          <Paper elevation={3} sx={{ p: 3, borderRadius: '15px', mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              <EventNote sx={{ verticalAlign: 'middle', mr: 1 }} />
              Upcoming Events
            </Typography>
            {upcomingEvents.map((event, index) => (
              <Box key={index} sx={{ 
                p: 2, 
                mb: 1, 
                borderRadius: '8px',
                backgroundColor: '#f8f9fa'
              }}>
                <Typography variant="body1">{event.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.date}
                </Typography>
              </Box>
            ))}
          </Paper>

          {/* Class Distribution Chart */}
          <Paper elevation={3} sx={{ p: 3, borderRadius: '15px' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Class Distribution
            </Typography>
            {classDistribution && classDistribution.length > 0 ? (
              <PieChart width={300} height={250}>
                <Pie
                  data={classDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {classDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            ) : (
              <Typography color="text.secondary" align="center">
                No data available
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
