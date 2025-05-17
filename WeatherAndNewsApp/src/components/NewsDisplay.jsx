import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';


const NewsDisplay = () => {
  const [news, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = import.meta.env.VITE_NYT_API_KEY;
  const apiUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`;

  useEffect(() => {
    const fetchNews = () => {
      setIsLoading(true);
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'OK') {
            setNewsData(data.results);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchNews();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="news-container">
      <Typography variant="h4" gutterBottom>
        News
      </Typography>
      <Grid container spacing={2} wrap="nowrap" style={{ overflowX: 'auto' }}>
        {isLoading ? (
          <Typography variant="h6">News Loading...</Typography>
        ) : (
          news.slice(0, 5).map((newsPack, index) => (
            <Grid item key={index} style={{ minWidth: 300 }}>
              <Card sx={{ width: 300, height: 500, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {newsPack.media.length > 0 ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={newsPack.media[0]['media-metadata'][2].url}
                    alt={newsPack.title}
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    height="200"
                    image="https://via.placeholder.com/150"
                    alt="No Image Available"
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent style={{ flexGrow: 1}}>
                  <Typography variant="h6" component="div" gutterBottom style={{ textAlign: 'left' }}>
                    {newsPack.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom style={{ textAlign: 'center' }}>
                    {newsPack.byline}
                  </Typography>
                  <Typography variant="body1" paragraph style={{ textAlign: 'left' }}>
                    {truncateText(newsPack.abstract, 80)}
                  </Typography>
                </CardContent>
                <Button
                  size="small"
                  color="primary"
                  href={newsPack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginBottom: '10px' }}
                >
                  Read More
                </Button>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default NewsDisplay;
