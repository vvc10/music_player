import React from 'react';
import '../components/style.I.css';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from './Home';
import ForYour from './ForYour';
import Discover from './Discover';
import SearchBar from './SearchBar';
import MainTopBar from './MainTopBar';
import AlbumPage from './AlbumPage';
import { MusicProvider, useMusicContext } from './MusicContext';
import MusicPlayer from './MusicPlayer';
import Banner from './Banner';
import BottomBar from './BottomBar';
const Main = () => {




  return (
    <>

      <div className='fl_main'>

        <MusicProvider>
          <MainTopBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/foryou" element={<ForYour />} />
            <Route path="/albumpage/:musicId" element={<AlbumPage />} />
          </Routes>
          <BottomBar/>
          <div className='mp-zone-fxd'>
            <MusicPlayer />
          </div>
        </MusicProvider>


      </div>
    </>

  )
}

export default Main
