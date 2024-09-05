import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '0c4d3b8e72c73f888b92994cd6f6dd86';
const API_URL = 'https://ws.audioscrobbler.com/2.0/';

const WeeklyAlbumsComponent = () => {
  const [topTracks, setTopTracks] = useState([]);

  const fetchTopTracks = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          method: 'chart.gettoptracks',
          api_key: API_KEY,
          format: 'json',
        },
      });

      // Check if the response status is OK (200) and if the data structure is as expected
      if (
        response.status === 200 &&
        response.data &&
        response.data.tracks &&
        response.data.tracks.track
      ) {
        const tracks = response.data.tracks.track;
        setTopTracks(tracks);
      } else {
        console.error('Invalid response from Last.fm API:', response);
        throw new Error('Invalid response format from Last.fm API');
      }
    } catch (error) {
      console.error('Error fetching top tracks data:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTopTracks();
      } catch (error) {
        console.error('Error fetching music data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
     <h1>WeeklyAlbumsComponent</h1>
      {/* Render top tracks data in your component */}
      {topTracks.map(track => (
        <>
            
        <div key={track.name}>
          <h3>{track.name}</h3>
          <p>Playcount: {track.playcount}</p>
          <a href={track.url}>Listen</a>
        </div>
        </>
       
      ))}
    </div>
  );
};

export default WeeklyAlbumsComponent;
