import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

const CurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState([null, null]);
  const [showCurrent, setShowCurrent] = useState(false);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, errors);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  function success(position) {
    setCurrentLocation([position.coords.latitude, position.coords.longitude]);
    setShowCurrent(true);
  }

  function errors() {
    alert('Sorry, location service not available');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10vh',
        gap: 2,
      }}
    >
      <Button 
        onClick={getLocation} 
        variant="contained" 
        size="small"
      >
        Get Current Location
      </Button>

      {showCurrent && (
        <Typography variant="body1" align="center">
          📍 You are currently located at:
          <br />
          <strong>Latitude:</strong> {currentLocation[0]}
          <br />
          <strong>Longitude:</strong> {currentLocation[1]}
        </Typography>
      )}
    </Box>
  );
};

export default CurrentLocation;
