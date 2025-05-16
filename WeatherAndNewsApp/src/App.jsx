import { useState } from 'react'
import { useEffect } from 'react'
import NewsDisplay from './components/NewsDisplay'
import WeatherDisplay from './components/WeatherDisplay'
import './styles/App.css'


function App() {

  return (
    <>
      <h1>Weather and News </h1>
      <div className="outer-box">
        <WeatherDisplay />
        <NewsDisplay />
      </div>
    </>
  )
}

export default App
