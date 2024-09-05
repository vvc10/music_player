import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlbumsCards from './AlbumsCards'; // Importing the AlbumCards component
import { Link } from 'react-router-dom';
import '../components/style.I.css';
import { useRef } from 'react';

const AlbumsList = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);  // Set initial loading state to true
  const albumsContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching access token from Spotify
        const tokenResponse = await axios.post(
          'https://accounts.spotify.com/api/token',
          'grant_type=client_credentials',
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa('4e02a61ae0be45978765ad1d03a3e018:8de8e36efa3242e8a621ddf4bbc8ae1d')
            }
          }
        );

        const accessToken = tokenResponse.data.access_token;

        // Fetching new releases
        const albumsResponse = await axios.get(
          'https://api.spotify.com/v1/browse/new-releases', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
            params: {
              country: 'GB', // Specify country code if needed
              locale: 'en_GB', // Specify locale for language if needed
              timestamp: new Date().toISOString(), // Include current timestamp
            },
          }
        );

        setAlbums(albumsResponse.data.albums.items);
        console.log(albumsResponse);
        setLoading(false); // Set loading state to false after fetching data
      } catch (error) {
        console.error('Error fetching data from Spotify API:', error);
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchData();
  }, []);

  return (
    <div className='albums_div'>
      <div className='albums_div_label'>
        <p>New Releases</p>
        <Link to='/newreleasespage'>show all</Link>
      </div>
      <div className='albums_card_fl'>
        <div className='albumscard_fl_show' ref={albumsContainerRef}>
          {loading ? <p>Loading...</p> : <AlbumsCards albums={albums} />}
        </div>
      </div>
      {/* Pass albums data as props to the AlbumCards component */}
    </div>
  );
};

export default AlbumsList;
