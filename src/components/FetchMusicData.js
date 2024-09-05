import axios from 'axios';

const accessToken = 'hRilPlS-kJmbtUXuaHZwllZE4vZNhkvMff3Cnknm8RVwqfOdIscqWIJ6Lwh_xPQt';

const FetchMusicData = async (songTitle, artistName) => {
  try {
    const response = await axios.get(`/api/search?q=${encodeURIComponent(songTitle)} ${encodeURIComponent(artistName)}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // Check if the response status is OK (200)
    if (response.status === 200) {
      const data = response.data;
      // console.log('Genius data:', data);
      return data;
    } else {
      console.error('Invalid response from Genius API:', response);
      throw new Error('Invalid response format from Genius API');
    }
  } catch (error) {
    console.error('Error fetching Genius data:', error.message);
    throw error;
  }
};
export default FetchMusicData;
