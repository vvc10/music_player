

import React, { useRef, useState, useEffect } from 'react';
import AlbumsCards from './AlbumsCards';
import '../components/style.I.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { collection, getDocs, query, where } from 'firebase/firestore';  // Ensure these imports are present
import { firestore } from './firebaseConfig';  // Ensure this import is present

const AlbumsList = () => {
  const [albumList, setAlbumList] = useState([]);
  const [loading, setLoading] = useState(true);  // Set initial loading state to true
  const albumsContainerRef = useRef(null);

  const handleScrollRight = () => {
    if (albumsContainerRef.current) {
      const scrollDistance = 200;
      albumsContainerRef.current.scrollLeft += scrollDistance;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const musicCollection = collection(firestore, 'weekly_albums');
        const q = query(musicCollection);  // You can add additional conditions using 'where' as needed
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAlbumList(data);
        setLoading(false);  // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);  // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='albums_div'>
      <div className='albums_div_label'>
        <p>Albums of the week</p>
        <Link to='/albumsofweekpage'>show all</Link>
      </div>
      <div className='albums_card_fl'>
        <div className='albumscard_fl_show' ref={albumsContainerRef}>
          {albumList.slice(0, 6).map((music, index) => (
            <AlbumsCards key={index} music={music} index={index} />
          ))}
        </div>
        {/* <div className='albums_card_f1_scrollbtn' onClick={handleScrollRight}>
          >
        </div> */}
      </div>
    </div>
  );
};

export default AlbumsList;


