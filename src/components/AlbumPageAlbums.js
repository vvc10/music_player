import React from 'react'
import { useMusicContext } from './MusicContext';

const AlbumPageAlbums = ({ music }) => {
  const { handlePlay } = useMusicContext();
   console.log("songlist on albumPage", music);

  const handleClickPlay = () => {
    handlePlay(music);
  }

  const handleClickDownload = () => {

  }
  return (
    <div className='ap-div-body-list'>

      <div className='apdbl-cover'>
        {/* <div className='apdbl-srno'>{music.id}</div> */}
        <img src={music.cover} />
        <div className='apdbl-title'>{music.title}</div>
      </div>
      <div className='apdbl-artist'>{music.artist}</div>

      {/* <div className='apdbl-duration'>{music.duration}</div> */}
      <div className='apdbl-dwnld-btn' onClick={handleClickDownload}><a href={music.song_download_url}><i class="fa fa-download"></i></a></div>

      <div className='apdbl-playbtn' onClick={handleClickPlay}>
      <i class="fa">&#xf144;</i>
      </div>
    </div>
  )
}

export default AlbumPageAlbums
