import React from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import '../components/style.I.css'
import MusicPlayer from './MusicPlayer'
import { MusicProvider } from './MusicContext'
import { Router, Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage'

const HomeScreen = () => {
    return (
        <>
            <MusicProvider>
                <div className='homefl'>
                    <Sidebar />
                    <Main />




                </div>
                 
            </MusicProvider>

        </>

    )
}

export default HomeScreen
