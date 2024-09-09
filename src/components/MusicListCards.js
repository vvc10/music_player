import React, { useState } from 'react'
import { useMusicContext } from './MusicContext';
import '../components/style.I.css'
import MusicPlayer from './MusicPlayer'
import ArtistsCards from './ArtistsCards'
import MusicPlayingGif from './MusicPlayingGif';
const MusicListCards = (music) => {
  const { selectedMusic } = useMusicContext();
  const { handlePlay } = useMusicContext();
  const handleClickPlay = () => {
    handlePlay(music);
  };

  return (
    <>
      <div className='musiclistcards_fl'>

        <label>{music.rank}</label>
        <span>
          <img src={music.cover} />
          <p>{music.title}</p>
        </span>
        <caption>{music.artist}</caption>
        <div className='spacer'> {music.plays}</div>
        <div className='duration'>{music.duration}</div>
        <div className='playbtn' onClick={handleClickPlay}>
          {
            selectedMusic && selectedMusic.id === music.id ?

              <MusicPlayingGif />

              :
              <i class="fa">&#xf144;</i> 
          }

        </div>
      </div>





    </>

  )
}

export default MusicListCards
