import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { Card, CardContent, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../AuthContext'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { authTokens } = useAuth(); // Assuming useAuth provides access to your tokens


 

  useEffect(() => {

    const tokens = authTokens;

    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens?.access}`, // Use your auth token
          },
        });

        if (!response.ok) throw new Error('Failed to fetch profile data');

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authTokens]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    // <Container component="main" maxWidth="sm">
    //   <Typography component="h1" variant="h5" gutterBottom>
    //     User Profile
    //   </Typography>
    //   {profile ? (
    //     <div>
    //       <Typography variant="subtitle1">First Name: {profile.first_name}</Typography>
    //       <Typography variant="subtitle1">Last Name: {profile.last_name}</Typography>
    //       <Typography variant="subtitle1">Email: {profile.email}</Typography>
    //       {/* Display more profile information here */}
    //     </div>
    //   ) : (
    //     <Alert severity="info">No profile data found.</Alert>
    //   )}
    // </Container>
    <Container maxWidth="sm" sx={{ mt: 4 }}>
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)} // Go back to the previous page
      sx={{ mb: 2 }}
    >
      Back
    </Button>
    { profile ? 
    (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 1.5 }}>
          First Name: {profile?.first_name}
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 1.5 }}>
          Last Name: {profile?.last_name}
        </Typography>
        <Typography variant="body1" component="p">
          Email: {profile?.email}
        </Typography>
        {/* Include more profile fields as needed */}
      </CardContent>
    </Card>
    ) : (
          <Alert severity="info">No profile data found.</Alert>
    )}
  </Container>
  );
};

export default UserProfile;
