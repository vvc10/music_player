import React, { useState, useEffect } from 'react';
import '../components/style.I.css';
import { useMusicContext } from './MusicContext';

const MusicPlayer = () => {
  const { selectedMusic, playPrev, playNext } = useMusicContext();
  const [audioRef, setAudioRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerVisible, setPlayerVisible] = useState(false); // Start with player hidden

  useEffect(() => {
    if (selectedMusic) {
      setPlayerVisible(true); // Show player when new music is selected
      if (audioRef) {
        audioRef.src = selectedMusic.song_url;
        audioRef.load();
        audioRef.play();
        setIsPlaying(true);
      }
    }
  }, [selectedMusic, audioRef]);

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause();
      } else {
        audioRef.play();
      }
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.currentTime);
  };

  const handleSeekBarChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.currentTime = newTime;
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.duration);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleNext = () => {
    playNext();
    setCurrentTime(0);
  };

  const handlePrev = () => {
    playPrev();
    setCurrentTime(0);
  };

  const togglePlayerVisibility = () => {
    setPlayerVisible((prevVisible) => !prevVisible);
  };

  const mpcardbgset = {
    backgroundImage: selectedMusic ? `url(${selectedMusic.cover})` : null,
    backgroundSize: 'cover',
    filter: 'blur(1px)',
    backgroundColor: selectedMusic ? 'rgba(0, 0, 0, 0.5)' : 'none',
  };

  if (!playerVisible || !selectedMusic) {
    return null; // If player is not visible or no music selected, render nothing
  }

  return (
    <div className='fxd_musicplayer'>
      <div className='fxd_musicplayer_icon' onClick={togglePlayerVisibility}>+</div>
      <div className='fscmp_bg' style={mpcardbgset}></div>
      <div className='mp-img'>
        <img src={selectedMusic.cover} alt='Music Cover' />
        <div className='mp-songdetails'>
          <div className='mp-songd-ar'>
            <span>{selectedMusic.title}</span>
            <p>{selectedMusic.artist}</p>
          </div>
        </div>
      </div>
      <div className='mp-ranger-div'>
        <input
          type='range'
          value={currentTime}
          max={duration}
          onChange={handleSeekBarChange}
        />
        <div className='mp-time-display'>
          <div className='mp-time-display-l'>{formatTime(currentTime)}</div>
          <div className='mp-time-display-r'>{formatTime(duration - currentTime)}</div>
        </div>
      </div>
      <div className='mp-controls'>
        <div className='mpc mp-shuffle'></div>
        <div className='mpc mp-prev' onClick={handlePrev}><i className="fa">&#xf04a;</i></div>
        <div className='mpc mp-play-pause' onClick={handlePlayPause}>
          {isPlaying ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}
        </div>
        <div className='mpc mp-next' onClick={handleNext}>
          <i className="fa fa-forward"></i>
        </div>
        <div className='mpc mp-queue'><i className="material-icons">queue_music</i></div>
      </div>
      <audio
        ref={(audio) => setAudioRef(audio)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
}

export default MusicPlayer;
