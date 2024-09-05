import React, { useEffect } from 'react';
import '../components/style.I.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoMdHeartEmpty } from "react-icons/io";
const AlbumsCards = ({ albums }) => {

  return (
    <>
    
      {
        albums.slice(0, 6).map(album => (
          
          <div className='albumscardsdiv'>

            <Link to={`/albumpage/${album.id}`}>
              <img src={album.images[0].url} alt="Album Cover" />
             
              <span>
                {album.name.length > 10 ? album.name.slice(0, 10) + '..' : album.name}

              </span>

              {album.artists.map((artist, index) => (
                <p key={index}>
                  {artist.name.length > 10 ? artist.name.slice(0, 10) + '..' : artist.name}
                </p>
              ))}

            </Link>


          </div>)

        )
      }
    </>
  );
};

export default AlbumsCards;
