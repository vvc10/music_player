import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AlbumPageAlbums = () => {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        const albumResponse = await axios.get(
          `https://api.spotify.com/v1/albums/${id}/tracks`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );

        setTracks(albumResponse.data.items); // Corrected to set the tracks array
      } catch (error) {
        console.error('Error fetching album:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleClickPlay = () => {
    // Handle play action for the track
  };

  const handleClickDownload = () => {
    // Handle download action for the track
  };

  return (
    <>
      {tracks.map((track, index) => (
        <div key={index} className='ap-div-body-list'>
          <div className='apdbl-cover'>
            {track.album && track.album.images && track.album.images.length > 0 && (
              <img src={track.album.images[0].url} alt={track.album.name} />
            )}
          </div>
          <div className='apdbl-details'>
            <div className='apdbl-title'>{track.name}</div>
            <div className='apdbl-artist'>
              {track.artists.map((artist, index) => (
                <p key={index}>{artist.name}</p>
              ))}
            </div>
            <div className='apdbl-duration'>{/* Add duration if available */}</div>
          </div>

          <div className='apdbl-dwnld-btn' onClick={handleClickDownload}>
            <a href={track.external_urls.spotify}><i className="fa fa-download"></i></a>
          </div>
          <div className='apdbl-playbtn' onClick={handleClickPlay}>
            <i className="fa">&#xf144;</i>
          </div>

        </div>
      ))}
    </>

  );
};

export default AlbumPageAlbums;
