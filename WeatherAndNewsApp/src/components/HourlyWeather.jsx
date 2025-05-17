import React from 'react'
import { useState } from 'react';
import { Button, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';

const HourlyWeather = ({lat, lon}) => {
    const [hourlyWeather, sethourlyWeather] = useState([]);
    const [error, setError] = useState("");
    const [showHourly, setShowHourly] = useState(false);

    const apiKey = import.meta.env.VITE_WZR_API_KEY;
    const hrlyUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=5`

    const fetchHourly = () => {
        fetch(hrlyUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.cod === "200") {
              sethourlyWeather(data);
              setShowHourly(true);
            } else {
              alert("Hourly Weather not found");
            }
          })
          .catch((error) => {
            setError('There was an error fetching hourly weather data');
            console.error(error);
          });
      };

      return (
        <div style={{ marginTop: 20 }}>
          <Button onClick={fetchHourly} variant="contained" sx={{ marginBottom: 2 }}>
            Get Hourly Weather
          </Button>
    
          <Grid container spacing={2} sx={{ overflowX: 'auto', flexWrap: 'nowrap', justifyContent: 'center' }}>
            {showHourly ? (
              hourlyWeather.list.map((weatherPack, index) => (
                <Grid item key={index}>
                  <Card
                    sx={{
                      width: 150,
                      height: 160,
                      backgroundColor: '#015c9c',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="80"
                      image={`https://openweathermap.org/img/wn/${weatherPack.weather[0].icon}@2x.png`}
                      alt={weatherPack.weather[0].main}
                    />
                    <CardContent>
                      <Typography variant="body1" align="center">
                        {weatherPack.weather[0].main}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1">Hourly not Found</Typography>
            )}
          </Grid>
        </div>
    )
}

export default HourlyWeather
