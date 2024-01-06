import React from 'react';
import '../components/style.I.css';
import { Link } from 'react-router-dom';

const AlbumsCards = ({ music }) => {
    console.log('music ID...', music);

    return ( 
        <>

            <div className='albumscardsdiv'>
                <Link to={`/albumpage/${music.id}`}>
                    <img src={music.cover} alt={`${music.artist} - ${music.title}`} />
                    <span>{music.title}</span>
                    <p>{music.artist}</p>
                </Link>
            </div>

        </>
    );
}

export default AlbumsCards;
