import React from 'react'
import { Link } from 'react-router-dom'
import '../components/style.I.css'


const HotListCards = ({ music }) => {
    return (
        <div className='hotlistcardsdiv'>
            <Link to={`/albumspage/${music.id}`}>
                <img src={music.cover} alt={`${music.artist} - ${music.title}`} />
                <span>{music.artist}</span>
                <p>{music.stream}</p>
            </Link>
        </div>
    )
}

export default HotListCards
