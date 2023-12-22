import React from 'react'
import MusicListCards from './MusicListCards'
import { weeklyAlbums } from '../db/MusicDb'
import { PopularTrackDataBase } from '../db/PopularTracksDb'
const PopularTracks = () => {
    return (
        <div className='populartracks_div'>
            <label>Popular Tracks</label>
            <div className='ptd_fl'>
            {PopularTrackDataBase.map((music, index) => (
        <MusicListCards key={index} {...music} />
      ))}

            </div>
        </div>
    )
}

export default PopularTracks
