import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { hotListdb } from '../db/MusicDb';
import HotListCards from './HotListCards';
import '../components/style.I.css';

const HotList = () => {
  const [hotlist, setHotList] = useState([]);
  const [loading, setLoading] = useState(true);

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

        // Fetching featured playlists
        const playlistsResponse = await axios.get(
          'https://api.spotify.com/v1/browse/featured-playlists',
          {
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

        setHotList(playlistsResponse.data.playlists.items);
        setLoading(false); // Set loading state to false after fetching data
      } catch (error) {
        console.error('Error fetching data from Spotify API:', error);
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchData();
  }, []);

  return (
    <div className='hotlist_div'>
      <div className='hotlist_div_label'>
        <p>Featured Albums</p>
        <Link to='/hotlistpage'>Show all</Link>
      </div>
      <div className='hotlist_card_fl'>
        <div className='hotlistcard_fl_show'>
          {loading ? <p>Loading...</p> : <HotListCards hotlist={hotlist} />}
        </div>
      </div>
    </div>
  );
};

export default HotList;
