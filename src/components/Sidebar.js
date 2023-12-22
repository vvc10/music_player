import React from 'react'
import '../components/style.I.css'
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from './Home';

const Sidebar = () => {
  return (
    <div className='fl_sidebar'>
      <ul>
        <p>Lofify</p>
      </ul>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/discover">Discover</Link>
        </li>
        <li>
          <Link to="/foryou">For you</Link>
        </li>


      </ul>
     
      <hr/>
      {/* <label>Music list</label> */}
      <ul>
        <li>
          <Link to="/">Favourits</Link>
        </li>
        <li>
          <Link to="/discover">Playlists</Link>
        </li>
        <li>
          <Link to="/foryou">Collections</Link>
        </li>


      </ul>

    </div>
  )
}

export default Sidebar
