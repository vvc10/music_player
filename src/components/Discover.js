import React from 'react'
import imgg1 from '../assets/imagecover.jpg'
import { generes } from './Genres'
import { firestore } from './firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
const Discover = () => {
  const [generesList, setGeneresList] = useState([]);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const musicCollection = collection(firestore, 'genres'); // 'music' is the name of your collection
        const snapshot = await getDocs(musicCollection);
        const data = snapshot.docs.map(doc => doc.data());
        setGeneresList(data);
        console.log(setGeneresList);
      } catch (error) {
        console.error('Error fetching music data:', error);
      }
    };

    fetchMusicData();
  }, []);


  
  return (
    <div className='discover_div'>
      {/* <div className='discover_div_head'>Discover</div> */}

      <div className='discover_div_body'>
        <div className='dis_grid_body'>
          <label>Trending Searches </label><br />
          <div className='dis-grid-container-gc'>
            <div class="dis-grid-container">
              <div class="dis-grid-item">
                <img src="https://placekitten.com/200/200" alt="Discover Item 1" />
                <div class="grid-item-content">
                  <h3>Discover Item 1</h3>
                  <p>Description for item 1.</p>
                </div>
                <div className='grid-item-forwd'>></div>
              </div>

              <div class="dis-grid-item">
                <img src="https://placekitten.com/200/200" alt="Discover Item 1" />
                <div class="grid-item-content">
                  <h3>Discover Item 1</h3>
                  <p>Description for item 1.</p>
                </div>
                <div className='grid-item-forwd'>></div>
              </div>

              <div class="dis-grid-item">
                <img src="https://placekitten.com/200/200" alt="Discover Item 1" />
                <div class="grid-item-content">
                  <h3>Discover Item 1</h3>
                  <p>Description for item 1.</p>
                </div>
                <div className='grid-item-forwd'>></div>
              </div>

              <div class="dis-grid-item">
                <img src="https://placekitten.com/200/200" alt="Discover Item 1" />
                <div class="grid-item-content">
                  <h3>Discover Item 1</h3>
                  <p>Description for item 1.</p>
                </div>
                <div className='grid-item-forwd'>></div>
              </div>

              <div class="dis-grid-item">
                <img src="https://placekitten.com/200/200" alt="Discover Item 1" />
                <div class="grid-item-content">
                  <h3>Discover Item 1</h3>
                  <p>Description for item 1.</p>
                </div>
                <div className='grid-item-forwd'>></div>
              </div>

              <div class="dis-grid-item">
                <img src="https://placekitten.com/200/200" alt="Discover Item 1" />
                <div class="grid-item-content">
                  <h3>Discover Item 1</h3>
                  <p>Description for item 1.</p>
                </div>
                <div className='grid-item-forwd'>></div>
              </div>
            </div>
            <div className='dis-grid-scroll'>></div>

          </div>
          <label>Pick from Genres</label>
          <div className='dis2-grid-container-gc'>
            {
              generesList.map((cover, index) => (
                <div key={index} className='dis2-grid-ele'>
                  <img src={cover.coverImg} />
                  <p>{cover.title}</p>
                </div>
              ))}
          </div>

        </div>

      </div>
    </div>
  )
}

export default Discover
