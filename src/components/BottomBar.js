import React from 'react'
import '../components/style.I.css'
import { Link } from 'react-router-dom'
const BottomBar = () => {
  return (
    <div className='bottombar_div'>
    <div className='bbdiv_in'>
    <ul>
        <li>
        <Link to="/">
          <i class="fa fa-home"></i>Home</Link>
        </li>
        <li>
          <Link to="/discover"> 
<i class="fa fa-search"></i>Discover</Link>
        </li>
        <li>
          <Link to="/foryou">
<i class="fa fa-bars"></i>Playlists</Link>
        </li>
        <li>
          <Link to="/foryou">
<i class="fa fa-user"></i>you</Link>
        </li>


      </ul>
    </div>
      
    </div>
  )
}

export default BottomBar
