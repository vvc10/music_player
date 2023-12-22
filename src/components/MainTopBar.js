import React from 'react'
import SearchBar from './SearchBar'
import AccountSecOpt from './AccountSecOpt'
import '../components/style.I.css'
const MainTopBar = () => {
  return (
    <div className='maintopbarfl'>
      <SearchBar/>
      <AccountSecOpt/>
    </div>
  )
}

export default MainTopBar
