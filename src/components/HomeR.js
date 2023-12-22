import React from 'react'
import MusicPlayer from './MusicPlayer'
import '../components/style.I.css'
import { useMusicContext } from './MusicContext'
import RecentlyPlayed from './RecentlyPlayed'
const HomeR = () => {
  const { recentlyPlayed } = useMusicContext();
  return (
    <div className='homer'>

      <div className='homer_up'>
        <div className='recentlyplayed-sec'>
          <label>Recently played</label>
          <div className='recentlyplayed-body'>
            {
              recentlyPlayed.map((music, index) => (
                <RecentlyPlayed key={index} {...music} />
              )
              )}

          </div>
        </div>
      </div>
      {/* <div className='homer_down'>
        <MusicPlayer />
      </div> */}



    </div>
  )
}

export default HomeR
