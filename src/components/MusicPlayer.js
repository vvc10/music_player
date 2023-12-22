import React from 'react'
import { useState, useEffect } from 'react'

import '../components/style.I.css'
import { useMusicContext } from './MusicContext'
const MusicPlayer = () => {
  const { selectedMusic, playPrev, playNext } = useMusicContext();
  const [audioRef, setAudioRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Update the audio element when the selected music changes
    if (audioRef) {
      audioRef.src = selectedMusic ? selectedMusic.url : null;
      audioRef.load(); // Load the new source
      audioRef.play();
      setIsPlaying(true);

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

  // Function to convert seconds to MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleNext = () => {
    playNext();
    setCurrentTime(0); // Reset current time when moving to the next song
  };

  const handlePrev = () => {
    playPrev();
    setCurrentTime(0); // Reset current time when moving to the previous song
  };

  const mpcardbgset = {
    // content:''
    backgroundImage: selectedMusic ? `url(${selectedMusic.cover})` : null,
    backgroundSize: 'cover',
    filter: 'blur(1px)',
    backgroundColor: selectedMusic ? 'rgba(0, 0, 0, 0.5)' : 'none',
    // transform: 'scale(1.1)',        
  };


  return (
    <div className='fxd_musicplayer'>
      <div className='fscmp_bg' style={mpcardbgset}></div>
      <div className='mp-img'>
        <img src={selectedMusic ? selectedMusic.cover : "null"} />
        <div className='mp-songdetails'>
          <div className='mp-songd-ar'>
            <span>{selectedMusic ? selectedMusic.artist : "Artist"}</span>
            <p>{selectedMusic ? selectedMusic.genre : "Artist"}</p>
          </div>
        </div>
        {/* <div className='mp-songdown-heart'>
        <i class="fa">&#xf019;</i>
        <i class='far'>&#xf004;</i>
        </div> */}
      </div>
      <div className='mp-ranger-div'>

        <input
          type='range'
          value={currentTime}
          max={duration} bv
          onChange={handleSeekBarChange}
        />
        <div className='mp-time-display'>
          <div className='mp-time-display-l'>{formatTime(currentTime)}</div>
          <div className='mp-time-display-r'>    {formatTime(duration - currentTime)}</div>

        </div>
      </div>
      <div className='mp-controls'>
        <div className='mpc mp-shuffle'></div>
        <div className='mpc mp-prev'><i class="fa" onClick={handlePrev}>&#xf04a;</i></div>
        <div className='mpc mp-play-pause' onClick={handlePlayPause}>
          {
            isPlaying ? <i class="fa fa-pause"></i> : <i class="fa fa-play"></i>
          }


        </div>
        <div className='mpc mp-next'>

          <i class="fa fa-forward" onClick={handleNext}></i>
        </div>
        <div className='mpc mp-queue'></div>

      </div>
      <audio
        ref={(audio) => setAudioRef(audio)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  )
}

export default MusicPlayer
