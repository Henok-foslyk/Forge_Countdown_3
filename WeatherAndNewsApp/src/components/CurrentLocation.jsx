import React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { Box, Stack, TextField, Typography } from '@mui/material'

const CurrentLocation = () => {

    const [currentLocation, setCurrentLocation] = useState([null, null]);
    const [showCurrent, setShowCurrent] = useState(false);

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, errors);
          
        } else { 
          alert("Geolocation is not supported by this browser.");
        }
      }
  
      function success(position) {
        setCurrentLocation([position.coords.latitude, position.coords.longitude]);
        setShowCurrent(true);
      }
      
      function errors() {
        alert("Sorry, location service not available");
    }


    return (
        <div>
            <Button onClick={getLocation} variant="contained"> Get Current Location</Button>
            { showCurrent ?
              <p>Current Location: {currentLocation[0]}, {currentLocation[1]}</p>
              : ""
            }
        </div>
    )
}

export default CurrentLocation
