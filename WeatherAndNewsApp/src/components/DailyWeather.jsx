import React from 'react'
import { useState } from 'react';
import { Button, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';

const DailyWeather = ({lat, lon}) => {
    const [dailyWeather, setDailyWeather] = useState([]);
    const [errormessage, setError] = useState("");
    const [showDaily, setShowDaily] = useState(false);

    const apiKey = import.meta.env.VITE_WZR_API_KEY;
    const dailyUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=7`
    
    const fetchDaily = async () => {
        try {
            const response = await fetch(dailyUrl);
            const data = await response.json();
            if (data.cod === "200") {
                setDailyWeather(data);
                setShowDaily(true);
            } else {
                alert("Daily Weather not found");
            }
        } catch (error) {
            setError("There was an error fetching daily weather data");
            console.log(errormessage);
        }
    };
      

    return (
        <div style={{ marginTop: 20 }}>
          <Button onClick={fetchDaily} variant="contained">
            Get Daily Weather
          </Button>
          
          <Grid container spacing={2} sx={{ marginTop: 2, justifyContent: 'center', overflowX: 'auto', flexWrap: 'nowrap' }} >
            {showDaily ? (
              dailyWeather.list.map((weatherPack, index) => (
                <Grid item key={index} >
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
              <Typography variant="body1">Daily not Found</Typography>
            )}
          </Grid>
        </div>
      )
}

export default DailyWeather
