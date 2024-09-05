import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebaseConfig';

const Discover = () => {
  const [generesList, setGeneresList] = useState([]);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const musicCollection = collection(firestore, 'genres');
        const snapshot = await getDocs(musicCollection);
        const data = snapshot.docs.map(doc => doc.data());
        setGeneresList(data);
      } catch (error) {
        console.error('Error fetching music data:', error);
      }
    };

    fetchMusicData();
  }, []);

  return (
    <div className="discover_div p-4">
      <div className="discover_div_body">
        <div className="dis_grid_body flex flex-col">
          <label className="block text-lg font-semibold mb-2">Trending Searches</label>
          <div className="mb-4">
            <div className="scroll-bar-trend flex overflow-scroll overflow-y-hidden gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#111631] h-fit flex flex-row p-4 rounded-lg shadow-md">
                  <img
                    src="https://placekitten.com/200/200"
                    alt={``}
                    className="w-[20px] h-20px] my-auto object-cover rounded mr-[20px]"
                  />
                  <div className="flex flex-col w-[8rem]">
                    <h3 className="text-[14px]">Discover Item {i + 1}</h3>
                    <p className="text-[12px] text-gray-600"></p>
                  </div>
                  <div className="flex items-center text-xl text-gray-400 ml-4 opacity-20 cursor-pointer">></div>
                </div>
              ))}
            </div>
          </div>

          <label className="block text-lg font-semibold mb-2">Pick from Genres</label>
          <div className="dis2-grid grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {generesList.map((cover, index) => (
    <div key={index} className="h-[120px] w-full sm:w-[180px] md:w-[200px] bg-[#111631] dis2-grid-ele p-2 rounded-lg shadow-md">
      <img
        src={cover.coverImg}
        alt={cover.title}
        className="w-full h-32 object-cover rounded"
      />
      <p className="mt-2 text-center text-sm font-semibold">{cover.title}</p>
    </div>
  ))}
</div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
