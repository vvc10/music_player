import React, { useState, useEffect } from 'react';
import '../components/style.I.css';
import { useMusicContext } from './MusicContext';

const MusicPlayer = () => {
  const { selectedMusic, playPrev, playNext } = useMusicContext();
  const [audioRef, setAudioRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerHidden, setPlayerHidden] = useState(false); // Toggle player content, not the button

  useEffect(() => {
    if (selectedMusic) {
      setPlayerHidden(false); // Show player content when new music is selected
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
    setPlayerHidden((prevHidden) => !prevHidden); // Toggle player content visibility
  };

  const mpcardbgset = {
    backgroundImage: selectedMusic ? `url(${selectedMusic.cover})` : null,
    backgroundSize: 'cover',
    filter: 'blur(1px)',
    backgroundColor: selectedMusic ? 'rgba(0, 0, 0, 0.5)' : 'none',
  };

  if (!selectedMusic) {
    return null; // If no music is selected, render nothing
  }

  return (
    <div className={`fxd_musicplayer ${playerHidden ? "h-[10%] p-2" : "h-[40%] bg-red-200"}`}>
      <div className='fxd_musicplayer_icon' onClick={togglePlayerVisibility}>
        {playerHidden ? '+' : '-'}
      </div>
      {/* // Only show the player content if not hidden */}
      <>
        <div className='fscmp_bg' style={mpcardbgset}></div>
        <div className={`mp-img ${playerHidden ? "hidden" : "block"}`}>
          <img src={selectedMusic.cover} alt='Music Cover' />
          <div className='mp-songdetails'>
            <div className='mp-songd-ar'>
              <span>{selectedMusic.title}</span>
              <p>{selectedMusic.artist}</p>
            </div>
          </div>
        </div>
        <div className={`p-2 gap-[20px] ${playerHidden ? "block flex flex-row items-center" : "hidden"}`}>
          <img className='h-[50px] w-[50px]' src={selectedMusic.cover} alt='Music Cover' />
          <div className=''>
            <div className='mp-songd-ar'>
              <span>{selectedMusic.title}</span>
              <p>{selectedMusic.artist} | playing..</p>

            </div>
          </div>
        </div>
        <div className={`mp-ranger-div ${playerHidden ?"invisible": "visible"}`}>
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
        <div className={`mp-controls ${playerHidden ?"invisible": "visible"}`}>
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
      </>



      <audio
        ref={(audio) => setAudioRef(audio)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
}

export default MusicPlayer;
