import React from 'react'
import '../components/style.I.css'
import { useMusicContext } from './MusicContext';
import MusicPlayingGif from './MusicPlayingGif';

const EditorChoice = (music) => {
    const { selectedMusic } = useMusicContext();
    const { handlePlay } = useMusicContext();
    const handleClickPlay = () => {
        handlePlay(music);
    };
    return (
        <div className='editorchoice-div'>

            <ul>
                <li key={music.id}>
                    <div className='music-cover'>
                        <img src={music.cover} />
                    </div>
                    <div className='music-title'>
                        <span>{music.title}</span>
                        <br />
                        <label>{music.artist}</label>
                    </div>
                    <div className='playBtn' onClick={handleClickPlay}>
                        {
                            selectedMusic && selectedMusic.id === music.id ?
                              <MusicPlayingGif/>
                                :
                                <i class="fa fa-play"></i>
                        }
                    </div>


                </li>
                </ul>


        </div>
    )
}

export default EditorChoice
