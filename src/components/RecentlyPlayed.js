import React from 'react'

const RecentlyPlayed = (music) => {
    return (
        <div className='recenlyplayed-div'>
            <ul>
                <li key={music.id}>
                    <div className='music-cover'>
                        <img src={music.cover} />
                    </div>
                    <div className='music-title'>{music.title}
                        <br />
                        <label>{music.artist}</label>
                    </div>



                </li></ul>

        </div>
    )
}

export default RecentlyPlayed
