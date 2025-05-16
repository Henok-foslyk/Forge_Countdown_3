import React from 'react'
import { useState } from 'react';

const HourlyWeather = ({lat, lon}) => {
    const [hourlyWeather, sethourlyWeather] = useState([]);
    const [error, setError] = useState("");
    const [showHourly, setShowHourly] = useState(false);

    const apiKey = import.meta.env.VITE_WZR_API_KEY;
    const hrlyUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=3`

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
        <div>
            <button onClick={fetchHourly}> Get Hourly Weather </button>
            <div> {showHourly ?
                    hourlyWeather.list.map((weatherPack, index) => (
                        <div key={index}>
                            <p>{weatherPack.weather[0].main}</p>
                        </div>
                    )) : "Hourly not Found"}
            </div>
        </div>
    )
}

export default HourlyWeather
