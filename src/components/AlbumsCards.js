import React, { useEffect, useState } from 'react';
import '../components/style.I.css';
import { Link } from 'react-router-dom';
import { IoMdHeartEmpty } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { getAuth } from 'firebase/auth'; // Import Firebase auth
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; // Firestore functions
import { firestore } from './firebaseConfig'; // Your Firebase config file

const AlbumsCards = ({ albums }) => {
  const [user, setUser] = useState(null);

  // Handle Firebase Auth state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle like action
  const handleLikeAlbum = async (album) => {
    if (!user) {
      alert('You need to be logged in to like an album!');
      return;
    }

    try {
      const favoritesCollection = collection(firestore, 'favorites');
      // Add album to user's favorites collection
      await addDoc(favoritesCollection, {
        uid: user.uid,
        albumId: album.id,
        albumName: album.name,
        albumImage: album.images[0].url,
        songs: album.tracks.items.map((track) => ({
          name: track.name,
          id: track.id
        })) // Store album's songs
      });
      alert('Album liked!');
    } catch (error) {
      console.error('Error adding album to favorites:', error);
    }
  };

  return (
    <>
      {albums.slice(0, 6).map(album => (
        <div key={album.id} className='albumscardsdiv'>

          <div className='w-full flex justify-end relative top-[20px] px-2'>
            <CiHeart
              className="text-[17px] cursor-pointer shadow-md"
              onClick={(e) => {
                e.preventDefault(); // Prevent Link from navigating
                handleLikeAlbum(album);
              }}
            />
          </div>

          <Link to={`/albumpage/${album.id}`}>
            <img src={album.images[0].url} alt="Album Cover" />
            <span className="flex flex-row items-center justify-between w-full"  >
              <span>
                {album.name.length > 10 ? album.name.slice(0, 10) + '..' : album.name}
              </span>

            </span>

            {album.artists.map((artist, index) => (
              <p key={index}>
                {artist.name.length > 10 ? artist.name.slice(0, 10) + '..' : artist.name}
              </p>
            ))}
          </Link>
        </div>
      ))}
    </>
  );
};

export default AlbumsCards;
