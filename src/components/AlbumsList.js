import React, { useRef } from 'react'
import AlbumsCards from './AlbumsCards'
import '../components/style.I.css'
import { weeklyAlbums } from '../db/MusicDb'
import { Link } from 'react-router-dom'
import { firestore } from './firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'

const AlbumsList = () => {
  const [albumList, setAlbumList] = useState([]);
  const albumsContainerRef = useRef(null);
  const handleScrollRight = () => {



    if (albumsContainerRef.current) {
      // You can adjust the scroll distance based on your design
      const scrollDistance = 200;
      albumsContainerRef.current.scrollLeft += scrollDistance;
    }
  };
  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const musicCollection = collection(firestore, 'weekly_albums'); // 'music' is the name of your collection
        const snapshot = await getDocs(musicCollection);
        const data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setAlbumList(data);
        console.log('lists>>>>>', setAlbumList);
      } catch (error) {
        console.error('Error fetching music data:', error);
      }
    };

    fetchMusicData();
  }, []);

  return (
    <div className='albums_div'>
      <div className='albums_div_label'>
        <p>Albums of the week</p>
        <Link to='/albumsofweekpage'>show all</Link>
      </div>
      <div className='albums_card_fl' >
        <div className='albumscard_fl_show' ref={albumsContainerRef}>
          {albumList.slice(0, 6).map((music, index) => (
            <AlbumsCards key={index} music={music} index={index} />
          ))}</div>

        {/* <div className='albums_card_f1_scrollbtn' onClick={handleScrollRight}>
       >
        </div> */}
      </div>

    </div>
  )
}

export default AlbumsList
