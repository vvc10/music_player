import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import podbanner from '../assets/pexels-jandubanek-1134829.jpg';

const MoodPlay = () => {
  const [mood, setMood] = useState('');
  const [musicTracks, setMusicTracks] = useState([]);

  const fetchMusic = async (selectedMood) => {
    setMood(selectedMood);
    const options = {
      method: 'GET',
      url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
      params: { q: selectedMood },
      headers: {
        'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // Replace with your RapidAPI key
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setMusicTracks(response.data.data); // Assuming the music data is inside response.data.data
    } catch (error) {
      console.error('Error fetching music:', error);
    }
  };

  return (
    <div className='moodplay_div'>
      <div className='text-center'>
        <img src={podbanner} className='h-[60vh] w-[100vw] rounded-[0px] object-cover opacity-30 absolute top-[0]' />

        <h1 className='mx-4 mt-5 text-[30px] opacity-90 font-[800]'>Mood based playing</h1>
        <p className='py-2'>Play music by selecting your mood preference</p>

        <div className='moodCard_fl opacity-90 w-fit m-auto'>
          <div className='mood_card' onClick={() => fetchMusic('Happy')}>Happy 😀</div>
          <div className='mood_card' onClick={() => fetchMusic('Sad')}>Sad 😔</div>
          <div className='mood_card' onClick={() => fetchMusic('Emotional')}>Emotional 😔</div>
          <div className='mood_card' onClick={() => fetchMusic('Crying')}>Feels Crying 😭</div>
          <div className='mood_card' onClick={() => fetchMusic('No Feels')}>No Feels 😐</div>
        </div>

        {/* Display fetched music */}
        <div className='moodimusic_div'>
          {musicTracks.length > 0 ? (
            <div className='music_card'>
              {musicTracks.map((track) => (
                <div key={track.id} className='track'>
                  <img src={track.album.cover} alt={track.title} />
                  <p>{track.title}</p>
                  <p>{track.artist.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center'>Select a mood to play music...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodPlay;
