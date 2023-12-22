import React, {useRef} from 'react'
import AlbumsCards from './AlbumsCards'
import '../components/style.I.css'
import { weeklyAlbums } from '../db/MusicDb'
const AlbumsList = () => {
  const albumsContainerRef = useRef(null);
  const handleScrollRight = () => {

    if (albumsContainerRef.current) {
      // You can adjust the scroll distance based on your design
      const scrollDistance = 200;
      albumsContainerRef.current.scrollLeft += scrollDistance;
    }
  };

  return (
    <div className='albums_div'>
      <label>Albums of the week</label>
      <div className='albums_card_fl' >
      <div className='albumscard_fl_show' ref={albumsContainerRef}>
        {weeklyAlbums.map((music, index) => (
          <AlbumsCards key={index} music={music} index={index}/>
        ))}</div>

        <div className='albums_card_f1_scrollbtn' onClick={handleScrollRight}>
       >
        </div>
      </div>

    </div>
  )
}

export default AlbumsList
