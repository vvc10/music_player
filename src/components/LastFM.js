import React from 'react'

const LastFM = () => {
    const fetchData = async () => {
        try {
          const apiKey = '0e0c7df0fbd8e643ecf5ce2fbb1494b5';
          const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`);
          setAlbumList(response.data.tracks.track);
          console.log(response.data.tracks.track);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
}

export default LastFM
