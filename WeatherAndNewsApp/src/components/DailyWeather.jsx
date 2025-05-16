import React from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';

const DailyWeather = ({lat, lon}) => {
    const [dailyWeather, setDailyWeather] = useState([]);
    const [errormessage, setError] = useState("");
    const [showDaily, setShowDaily] = useState(false);

    const apiKey = import.meta.env.VITE_WZR_API_KEY;
    const dailyUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=3`
    
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
        <div>
            <Button onClick={fetchDaily}
                    variant="contained"
            > Get Daily Weather </Button>
            <div> {showDaily ?
                    dailyWeather.list.map((weatherPack, index) => (
                        <div key={index}>
                            <p>{weatherPack.weather[0].main}</p>
                        </div>
                    )) : "Daily not Found"}
            </div>
        </div>
    )
}

export default DailyWeather
