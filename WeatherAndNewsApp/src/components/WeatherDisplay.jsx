import React from 'react'
import { useState } from 'react'
import HourlyWeather from './HourlyWeather';
import CurrentWeather from './CurrentWeather';
import DailyWeather from './DailyWeather';
import CurrentLocation from './CurrentLocation';
import {Typography, Button, Box, TextField} from '@mui/material';



const WeatherDisplay = () => {
    const [locationInput, setLocationInput] = useState("");
    const [location, setLocation] = useState(null);
    const [coords, setCoords] = useState(null)
    const [locationRetrieved, setLocationRetrieved] = useState(false);

    const apiKey = import.meta.env.VITE_WZR_API_KEY;
    const locUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationInput)}&limit=1&appid=${apiKey}`
    

    const fetchLocation = () => {
      fetch(locUrl)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setLocation(data[0]);
            setCoords([location.lat, location.lon])
            setLocationRetrieved(true);
          } else {
            alert("City not found, make sure to use the correct format: City, State, Country");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return (
      <Box sx={{ padding: 3, maxWidth: 1500, margin: 'auto', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Weather
        </Typography>
    
        <CurrentLocation />
    
        <Box sx={{ my: 2 }}>
          <input
            type="text"
            placeholder="Enter city address like: London, England"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            style={{ padding: '0.5rem', width: '100%', maxWidth: 400 }}
          />
        </Box>
    
        <Button onClick={fetchLocation} variant="contained" sx={{ mb: 3 }}>
          Get Coordinate
        </Button>
    
        {locationRetrieved ? (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Location Info
              </Typography>
              <Typography>
                {location.name}, {location.state}, {location.country} — Lat: {location.lat} — Lon: {location.lon}
              </Typography>
            </Box>
    
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Current Weather
              </Typography>
              <CurrentWeather lat={coords[0]} lon={coords[1]} />
            </Box>
    
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Hourly Forecast for 5 hours Tomorrow
              </Typography>
              <HourlyWeather lat={coords[0]} lon={coords[1]} />
            </Box>
    
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Daily Forecast for the Next 7 Days
              </Typography>
              <DailyWeather lat={coords[0]} lon={coords[1]} />
            </Box>
          </>
        ) : (
          <Typography variant="body1">Awaiting Location Retrieval</Typography>
        )}
      </Box>
    );
    
  };
    /*
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Weather
        </Typography>
        <CurrentLocation/>
        <br />
        <input
            type="text"
            placeholder="Enter city address like: London, England"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            style={{ padding: "0.5rem", width: "300px" }} 
        />
        <br /> 
        <br />
        <Button onClick={fetchLocation} variant="contained"> Get Coordinate </Button>
        <br /> 
        <br />
        <div> 
            { locationRetrieved ?
              <div>  
                <div>
                    <p>Location: {location.name}, {location.state}, {location.country}</p>
                    <p>Lat: {location.lat}</p>
                    <p>Lon: {location.lon}</p>
                </div>
                <h3>Current Weather</h3>
                <CurrentWeather lat={coords[0]} lon={coords[1]} />
                <h3>Hourly Forecast</h3>
                <HourlyWeather lat={coords[0]} lon={coords[1]} />
                <h3>Daily Forecast</h3>
                <DailyWeather lat={coords[0]} lon={coords[1]} />
              </div> : "Awaiting Location Retrieval"
            }
        </div>
      </div>
    )
}*/


export default WeatherDisplay
