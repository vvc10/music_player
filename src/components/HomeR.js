import React from 'react'
import MusicPlayer from './MusicPlayer'
import '../components/style.I.css'
import { useMusicContext } from './MusicContext'
import RecentlyPlayed from './RecentlyPlayed'
import TopArtists from './TopArtists'
import { editorsChoice } from '../db/MusicDb'
import EditorChoice from './EditorChoice'
import { Link } from 'react-router-dom'
const HomeR = () => {
  const { recentlyPlayed } = useMusicContext();
  return (
    <div className='homer'>

      <div className='homer_up'>
        {/* {
          recentlyPlayed.length > 0 ? (
            <div className='recentlyplayed-sec'>
              <label>Recently played</label>

              <div className='recentlyplayed-body'>
                {

                  recentlyPlayed.map((music, index) => (
                    <RecentlyPlayed key={index} {...music} />
                  ))}
              </div>
            </div>
          )
            : ( */}
              <div className='editorchoice-sec'>
                <label>Editor's pickups<Link to='/hotlistpage'>show all</Link></label>

                <div className='editorchoice-body'>
                  {

                    editorsChoice.map((music, index) => (
                      <EditorChoice key={index} {...music} />
                    ))}
                </div>



              </div>
            {/* )
        } */}

      </div>
      {/* <div className='homer_down'>
        <MusicPlayer />
      </div> */}



    </div>
  )
}

export default HomeR
