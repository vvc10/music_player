import React, { useState } from 'react'
import { useMusicContext } from './MusicContext';
import '../components/style.I.css'
import MusicPlayer from './MusicPlayer'
import ArtistsCards from './ArtistsCards'
const MusicListCards = (music) => {
  const { selectedMusic } = useMusicContext();
  const { handlePlay } = useMusicContext();
  const handleClickPlay = () => {
    handlePlay(music);
  };

  return (
    <>
      <div className='musiclistcards_fl'>

        <label>{music.srno}</label>
        <span>
          <img src={music.cover} />
          <p>{music.title}</p>
        </span>
        <caption>{music.artist}</caption>
        <div className='spacer'> </div>
        <div className='duration'>{music.duration}</div>
        <div className='playbtn' onClick={handleClickPlay}>
          {selectedMusic && selectedMusic.id === music.id ?
            <div className='now-playing-icon'>
              <p>...</p>
            </div>
            :
            <i class="fa">&#xf144;</i>
          }

        </div>
      </div>





    </>

  )
}

export default MusicListCards
