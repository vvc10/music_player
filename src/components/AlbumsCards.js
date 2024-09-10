import React, { useEffect, useState } from 'react';
import '../components/style.I.css';
import { Link, useNavigate } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { getAuth } from 'firebase/auth'; // Import Firebase auth
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; // Firestore functions
import { firestore } from './firebaseConfig'; // Your Firebase config file

const AlbumsCards = ({ albums }) => {
  const [user, setUser] = useState(null);
  const Navigate = useNavigate();
  const [likedAlbums, setLikedAlbums] = useState([]);

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
  const handleLikeAlbum = async (album) => {
    if (!user) {
      Navigate("/login");
      return;
    }

    try {
      const favoritesCollection = collection(firestore, 'favorites');

      // Query Firestore to check if the album is already in favorites
      const q = query(
        favoritesCollection,
        where('uid', '==', user.uid),
        where('albumId', '==', album.id)
      );

      const querySnapshot = await getDocs(q);

      // If the album already exists, don't add it again
      if (!querySnapshot.empty) {
        alert('Album already liked!');
        return;
      }

      // Safely access tracks and items
      const albumTracks = album.tracks?.items?.map((track) => ({
        name: track.name,
        id: track.id
      })) || []; // If tracks or items are undefined, use an empty array

      // Add album to user's favorites collection
      await addDoc(favoritesCollection, {
        uid: user.uid,
        albumId: album.id,
        albumName: album.name,
        albumImage: album.images[0].url,
        songs: albumTracks // Store album's songs, safe to be an empty array if no tracks
      });

      alert('Album liked!');
      // Update state to reflect the liked album
      setLikedAlbums([...likedAlbums, album.id]);
    } catch (error) {
      console.error('Error adding album to favorites:', error);
      alert(`Failed to like the album: ${error.message}`);
    }
  };


  return (
    <>
      {albums.slice(0, 6).map(album => (
        <div key={album.id} className='albumscardsdiv'>

          <div className='w-full flex justify-end relative top-[20px] px-2'>

            {likedAlbums.includes(album.id) ? (
              <>
                <CiHeart
                  className="text-[17px] cursor-pointer shadow-md bg-red-800"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent Link from navigating
                    handleLikeAlbum(album);
                  }}
                />
              </>
            ) :
              (
                <>
                  <FaHeart
                    className="text-[15px] cursor-pointer shadow-md text-[#6200ff] opacity-60"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent Link from navigating
                      handleLikeAlbum(album);
                    }}
                  />
                </>
              )
            }

          </div>

          <Link to={`/albumpage/${album.id}`}>
            <img src={album.images[0].url} alt="Album Cover" />
            <span className="flex flex-row items-center justify-between w-full">
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
