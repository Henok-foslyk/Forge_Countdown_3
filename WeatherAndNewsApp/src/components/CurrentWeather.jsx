import React from 'react'
import { useState } from 'react'

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
        <div>
            <button onClick={fetchWeather}> Get Weather </button>
            <p> Weather at Location: {weatherData ? weatherData.weather[0].main : "No data"}</p>
        </div>
    )
}

export default CurrentWeather
