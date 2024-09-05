import React from 'react'
import LatestPods from './LatestPods'
import podbanner from '../assets/pexels-jandubanek-1134829.jpg'

const Podcasts = () => {
  return (
    <div>
      <div className='text-center'>
        <img src={podbanner} className='h-[60vh] w-[100vw] rounded-[0px] object-cover opacity-40 absolute top-[0]' />

        <h1 className='mx-4 mt-5 text-[30px] opacity-90 font-[800]'>Discover the Best Podcasts</h1>

        <div className='mx-2 p-2'>
          <div className='latest_pods'>
          </div>

        </div>


      </div>
      <LatestPods />
    </div>
  )
}

export default Podcasts
