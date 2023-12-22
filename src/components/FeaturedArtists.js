import React from 'react'

const FeaturedArtists = ({ music }) => {
  return (
    <div className='featured-art-fl'>
      <img src={music.cover}/>
      <span>{music.title}</span>
    </div>
  )
}

export default FeaturedArtists
