import React, { useState } from 'react'
import MusicListCards from './MusicListCards'
import { weeklyAlbums } from '../db/MusicDb'
import { PopularTrackDataBase } from '../db/PopularTracksDb'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore';  // Ensure these imports are present
import { firestore } from './firebaseConfig';  // Ensure this import is present
import { useEffect } from 'react'

const PopularTracks = () => {
const [loading, setLoading] = useState();
const [albumList, setAlbumList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const musicCollection = collection(firestore, 'populartracks');
            const q = query(musicCollection);  // You can add additional conditions using 'where' as needed
            const snapshot = await getDocs(q);
    
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAlbumList(data);
            console.log(data);
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
        <div className='populartracks_div'>
            <label>Popular Tracks <Link to='/hotlistpage'>show all</Link></label>
            <div className='ptd_fl'>
            {albumList.map((music, index) => (
        <MusicListCards key={index} {...music} />
      ))}

            </div>
        </div>
    )
}

export default PopularTracks
