import React from 'react'
import '../components/style.I.css'
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from './Home';
import { MdHomeFilled } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { RiMic2Fill } from "react-icons/ri";
import { FaUserLarge } from "react-icons/fa6";
const Sidebar = () => {
  return (
    <div className='fl_sidebar'>
    <div className='flsidebar_logo'>
      <ul style={{padding:'20px 20px', margin:'0px'}}>
       <li style={{padding:'0px', margin:'0px', listStyle:'none'}}> <Link to='/' style={{ textDecoration:'none', color:'white'}}>MoodiPlay</Link> </li> 
      </ul></div>
    
      <ul>
        <li>
          <Link to="/" className='flex flex-row gap-2 align-center'><MdHomeFilled/>Home</Link>
        </li>
        <li>
          <Link to="/discover" className='flex flex-row gap-2 align-center'><MdExplore/>Discover</Link>
        </li>
       


      </ul>
     
      <hr/>
      {/* <label>Music list</label> */}
      <ul>
        <li>
          <Link to="/moodplay" className='flex flex-row gap-2 align-center'><FaSearch/>Mood</Link>
        </li>
        {/* <li>
          <Link to="/playlists">Playlists</Link>
        </li> */}
        {/* <li>
          <Link to="/foryou">Favourites</Link>
        </li> */}
        <li>
          <Link to="/podcasts" className='flex flex-row gap-2 align-center'><RiMic2Fill/>Podcasts</Link>
        </li>
        <li>
          <Link to="/foryou" className='flex flex-row gap-2 align-center'> <FaUserLarge/> For you</Link>
        </li>
      </ul>

    </div>
  )
}

export default Sidebar
