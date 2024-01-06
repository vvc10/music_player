import React from 'react'
import { Link } from 'react-router-dom'
import { hotListdb } from '../db/MusicDb'
import HotListCards from './HotListCards'
import '../components/style.I.css'

const HotList = () => {
    return (
        <div className='hotlist_div'>
            <div className='hotlist_div_label'>
                <p>Hot list</p>
                <Link to='/hotlistpage'>show all</Link>
            </div>
            <div className='hotlist_card_fl' >
                <div className='hotlistcard_fl_show'>
                    { hotListdb.slice(0, 6).map((music, index) => (
                        <HotListCards key={index} music={music} index={index}/>
                    ))}
                </div>

                {/* <div className='albums_card_f1_scrollbtn' onClick={handleScrollRight}>
       >
        </div> */}
            </div>

        </div>
    )
}

export default HotList
