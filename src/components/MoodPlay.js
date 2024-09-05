import React, { useState } from 'react';
import axios from 'axios';
import podbanner from '../assets/pexels-jandubanek-1134829.jpg';

const MoodPlay = () => {
  const [mood, setMood] = useState('');
  const [musicTracks, setMusicTracks] = useState([]);
  const [userInput, setUserInput] = useState('');

  const fetchMusic = async (selectedMood) => {
    setMood(selectedMood);

    const options = {
      method: 'GET',
      url: `https://deezerdevs-deezer.p.rapidapi.com/search?q=${selectedMood}`,
      headers: {
        'x-rapidapi-key': '2b19caac34msha76c4bc7992a52ap114d38jsn14ba74d90f47',
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data); // Check the API response
      setMusicTracks(response.data.data);
    } catch (error) {
      console.error('Error fetching music:', error);
    }
  };

  const handleUserInput = () => {
    if (userInput.trim()) {
      fetchMusic(userInput.trim());
      setUserInput(''); // Clear the input field after fetching
    }
  };

  return (
    <div className='moodplay_div'>
      <div className='text-center z-50'>
        <img src={podbanner} className='h-[60vh] w-[100vw] rounded-[0px] object-cover opacity-40 absolute top-[0] ' />

        <h1 className='mx-4 mt-5 text-[30px] opacity-90 font-[800]'>Mood Based Playing</h1>
        <div className='moodCard_fl w-fit m-auto relative'>
          <div className='mood_card py-1 px-2' onClick={() => fetchMusic('happy')}>Happy 😀</div>
          <div className='mood_card py-1 px-2' onClick={() => fetchMusic('sad')}>Sad 😔</div>
          <div className='mood_card py-1 px-2' onClick={() => fetchMusic('emotional')}>Emotional 😢</div>
        </div>

        <div className='mood_card m-auto relative w-[60%] flex flex-col md:flex-row'>

          <input
            type='text'
            placeholder='Describe your mood ✒️'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className='text-[20px] bg-gray-900 md:w-[90%] w-[100%] px-4 py-2 border-[0] text-[15px] rounded-[100px]'
          />
          <button
            onClick={handleUserInput}
            className='ml-2 px-4 py-2 text-white rounded'
          >
            Search
          </button>
        </div>
      </div>

      <div className='moodimusic_div flex flex-row z-90'>
        {musicTracks.length > 0 ? (
          <div className='music_card_inmob md:music_card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 py-2 my-10 mx-auto'>
            {musicTracks.map((track) => (
              <div key={track.id} className='track border-[0] p-2 rounded-md bg-white-900 shadow-md'>
                <img src={track.album.cover} alt={track.title} className='w-full h-auto object-cover rounded-md' />
                <p className='mt-2 font-semibold'>{track.title}</p>
                <p className='text-gray-600'>{track.artist.name}</p>
              </div>
            ))}
          </div>

        ) : (
          <p className='text-center mx-auto mt-[100px] w-[90%]'>Select a mood or describe it to play music...</p>
        )}
      </div>
    </div>
  );
};

export default MoodPlay;
