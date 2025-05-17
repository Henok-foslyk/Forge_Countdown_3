import { useState } from 'react'
import { useEffect } from 'react'
import NewsDisplay from './components/NewsDisplay'
import WeatherDisplay from './components/WeatherDisplay'
import { Box, Typography, Paper } from '@mui/material'


function App() {

  return (
    <>
    <Box sx={{ backgroundColor: '#87ceeb', minHeight: '100vh', padding: 3 }}>
      <Box sx={{ textAlign: 'center', my: 4, minWidth: 1200, }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Weather and News
        </Typography>
      </Box>

      <Box
        className="outer-box"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,            // padding left & right inside container
          mx: 'auto',       // center horizontally
          maxWidth: 1800,
          mb: 6,
          boxSizing: 'border-box',
          overflowX: 'hidden',  // prevents horizontal scroll if anything spills out
          width: '100%',
        }}
      >
        <Paper elevation={3} sx={{ flex: 1, p: 3, minWidth: 500, textAlign: 'center' }}>
          <WeatherDisplay />
        </Paper>

        <Paper elevation={3} sx={{ flex: 1, p: 3, minWidth: 0 }}>
          <NewsDisplay />
        </Paper>
      </Box>
      </Box>
    </>

  )
}

export default App
