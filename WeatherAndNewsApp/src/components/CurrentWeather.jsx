import React from 'react'
import { useState } from 'react'
import { Button, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const CurrentWeather = ({lat, lon}) => {
    const [weatherData, setWeatherData] = useState(null);

    const apiKey = import.meta.env.VITE_WZR_API_KEY;
    const wzrUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    const fetchWeather = () => {
        fetch(wzrUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.length != 0) {
              setWeatherData(data);
            } else {
              alert("Weather data not found");
            }
          })
          .catch((error) => {
            setError('There was an error fetching weather data');
            console.error(error);
          });
      };

      
      
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 3 }}>
          <Button variant="contained" onClick={fetchWeather} size="small">
            Get Weather
          </Button>
    
          {weatherData ? (
            <Card sx={{ backgroundColor: '#015c9c', width: 300, display: 'flex', alignItems: 'center', padding: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 64, height: 64 }}
                image={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].main}
              />
              <CardContent>
                <Typography variant="h6">{weatherData.weather[0].main}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {weatherData.weather[0].description}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Typography>No data</Typography>
          )}
        </Box>
      )
}

export default CurrentWeather
