import React from 'react'
import Banner from './Banner'
import AlbumsList from './AlbumsList'
import PopularArtists from './PopularArtists'
import PopularTracks from './PopularTracks'
import { MusicProvider } from './MusicContext'

const HomeL = () => {
    return (
        <div className='homel'>
      
                {/* <Banner /> */}
             
                <PopularTracks />
          

        </div>
    )
}

export default HomeL
