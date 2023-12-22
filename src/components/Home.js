import React from 'react'
import SearchBar from './SearchBar'
import Banner from './Banner'
import AlbumsList from './AlbumsList'
import PopularArtists from './PopularArtists'
import HomeL from './HomeL'
import HomeR from './HomeR'
import '../components/style.I.css'
import { MusicProvider } from './MusicContext'

const Home = () => {
  
  return (
    <div className='homewlr'>
 
       <div className='homewl'>
        <HomeL />
      </div>

      <div className='homewr'>
        <HomeR />
      </div>
  
     
    </div>
  )
}

export default Home