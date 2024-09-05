import React from 'react'
import { Link } from 'react-router-dom'
import '../components/style.I.css'


const HotListCards = ({ hotlist }) => {
    return (

        <>
            {
                hotlist.slice(0, 6).map(album => (
                    <div className='hotlistcardsdiv'>
                        <Link to={`/hotlistpage/${album.id}`}>
                            <img src={album.images[0].url} alt={album.name} />
                            <span>{album.name}</span>
                            <p>{album.stream}</p>
                        </Link>
                    </div>
                ))}
        </>

    )
}

export default HotListCards
