import React from 'react';
import '../components/style.I.css';
import { Link } from 'react-router-dom';

const AlbumsCards = ({ music }) => {
    console.log('music here', music);

    return (
        <>
                     
               <div className='albumscardsdiv'>
                <Link to={`/albumspage/${music.id}`}>   
                    <img src={music.cover} alt={`${music.artist} - ${music.title}`} />
                    <span>{music.artist}</span>
                    <p>{music.stream}</p>
                    </Link>
                </div>
            
        </>
    );
}

export default AlbumsCards;
