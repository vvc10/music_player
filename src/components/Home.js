import React from 'react'
import SearchBar from './SearchBar'
import Banner from './Banner'
import AlbumsList from './AlbumsList'
import PopularArtists from './PopularArtists'
import HomeL from './HomeL'
import HomeR from './HomeR'
import '../components/style.I.css'
import { MusicProvider } from './MusicContext'
import HotList from './HotList'
import SpotifyFetch from './SpotifyFetch'

const Home = () => {

  return (
    <>
      <Banner />
      <div className='homefl_c'>
      {/* <SpotifyFetch/> */}
        <AlbumsList />
        <HotList/>
        <div className='homewlr'>
          <HomeL />
          <HomeR />
        </div>
      </div>


    </>

  )
}

export default Home