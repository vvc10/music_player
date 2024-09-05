// MusicComponent.js
import React, { useState, useEffect } from 'react';
import FetchMusicData from './FetchMusicData';  // Update the path accordingly

function MusicComponent() {
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songTitle = '';
        const artistName = 'anuv jain';
        const geniusData = await FetchMusicData(songTitle, artistName);
        const hitsFromData = geniusData.response.hits;
        setHits(hitsFromData);
        console.log("Hits:",hitsFromData)
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchData();
  }, []);  // Empty dependency array to run the effect only once

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Music Hits</h1>
      <ul>
      {hits.map((hit) => (
          <li key={hit.result.id}>
          <h1>{hit.result.id}</h1>
            <img src={hit.result.header_image_thumbnail_url} alt={hit.result.title} />
            <h3>{hit.result.full_title}</h3>
            <p>{hit.result.artist_names}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MusicComponent;
