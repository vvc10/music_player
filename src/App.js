import React, { useState } from 'react';
import axios from 'axios';
import HomeScreen from './components/HomeScreen';
import MusicComponent from './components/MusicComponent';
import WeeklyAlbumsComponent from './components/WeeklyAlbumsComponent';
import FetchMusicData from './components/FetchMusicData';

const App = () => {
  

    return (
        <>
        {/* <MusicComponent/> */}
       {/*  <WeeklyAlbumsComponent/> */}
        {/* <FetchMusicData/> */}
            <HomeScreen />
        </>
    );
};

export default App;
