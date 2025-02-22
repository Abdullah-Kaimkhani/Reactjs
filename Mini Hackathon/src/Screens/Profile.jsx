import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  Alert
} from '@mui/material';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          setError('User data not found');
        }
      } catch (err) {
        setError('Error fetching user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout =  () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>Loading profile...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  return (
    <Paper sx={{ 
      p: 3, 
      maxWidth: 500, 
      mx: 'auto', 
      mt: 4, 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2 
    }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>

      <TextField
        label="Name"
        value={userData?.name || ''}
        InputProps={{ readOnly: true }}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Email"
        value={userData?.email || ''}
        InputProps={{ readOnly: true }}
        fullWidth
        variant="outlined"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        sx={{ mt: 2, alignSelf: 'flex-start' }}
      >
        Logout
      </Button>
    </Paper>
  );
};

export default Profile;