import React from 'react'
import './style.I.css'
const MoodPlay = () => {
  return (
    <div className='moodplay_div'>
      <h2> Mood Based Play</h2>
      <p>Play music by selecting your mood preference and </p>
      <div className='moodCard_fl'>
        <div className='mood_card'>
          Happy 😀
        </div>

        <div className='mood_card'>
          Sad 😔
        </div>
        <div className='mood_card'>
          Emotional 😔
        </div>
        <div className='mood_card'>
          Feels Crying 😭
        </div>
        <div className='mood_card'>
          No Feels 😐
        </div>
        <div className='mood_card'>
          Describe your mood ✒️
        </div>
        {/* <div className='input_moodai'>
          <input placeholder='Describe your mood, MoodAI will get you prefered song..'/>
        </div> */}

        <div className='moodimusic_div'>
          <div className='music_card'>
            {/* <img src={}/> */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default MoodPlay
