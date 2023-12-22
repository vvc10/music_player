import React, { createContext, useContext, useState } from 'react';
import { PopularTrackDataBase } from '../db/PopularTracksDb.js'
// Create a context
const MusicContext = createContext();

// Update your MusicProvider component
export const MusicProvider = ({ children }) => {
  // const [selectedalbum, setSelectedAlbum ] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [recentlyPlayed, setrecentlyPlayed] = useState([])

  const setMusicList = (music) => {
    setSelectedMusic(music);
  };


  const musicList = PopularTrackDataBase; // assuming you have a music list

  const handlePlay = (music) => {
    setSelectedMusic(music);
    setrecentlyPlayed((prevRecentlyPlayed) => [music, ...prevRecentlyPlayed]);
  };

  const playNext = () => {
    const currentIndex = musicList.findIndex((music) => music === selectedMusic);
    const nextIndex = (currentIndex + 1) % musicList.length;
    setSelectedMusic(musicList[nextIndex]);
  };

  const playPrev = () => {
    const currentIndex = musicList.findIndex((music) => music === selectedMusic);
    const prevIndex = (currentIndex - 1 + musicList.length) % musicList.length;
    setSelectedMusic(musicList[prevIndex]);
  };

  return (
    <MusicContext.Provider value={{ selectedMusic, handlePlay, playNext, playPrev, recentlyPlayed, setMusicList }}>
      {children}
    </MusicContext.Provider>
  );
};

// Create a custom hook to use the context
export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};
