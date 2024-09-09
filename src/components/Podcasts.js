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
          <div className='latest_pods py-3'>
          <button className='px-3 py-2 rounded-[10px] bg-gray-700 mx-2 text-[16px]'>Explore Pods</button>
          <button className='px-3 py-2 rounded-[10px] bg-[#6200ff] mx-2 text-[16px] cursor-pointer opacity-90'>Generate AI Pods</button>
          </div>

        </div>


      </div>
      <LatestPods />
    </div>
  )
}

export default Podcasts
