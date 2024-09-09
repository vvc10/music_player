import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from './firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Authentication
import Modal from './Modal.js'; // Import the Modal component

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [user, setUser] = useState(null); // Track authenticated user

  // Listen for authentication state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchPlaylists(currentUser.uid); // Fetch playlists when user is authenticated
      } else {
        setUser(null);
        setPlaylists([]); // Clear playlists if user logs out
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Fetch playlists for the current user
  const fetchPlaylists = async (uid) => {
    try {
      const playlistsCollection = collection(firestore, 'playlists');
      const q = query(playlistsCollection, where('uid', '==', uid)); // Query by user's uid
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlaylists(data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistTitle || !user) return; // Ensure user is authenticated

    try {
      const playlistsCollection = collection(firestore, 'playlists');
      await addDoc(playlistsCollection, {
        title: newPlaylistTitle,
        songCount: 0, // Initialize with 0 songs or any default value
        uid: user.uid, // Associate the playlist with the current user
      });

      setNewPlaylistTitle('');
      setShowCreateForm(false);
      fetchPlaylists(user.uid); // Fetch updated playlists
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div className="p-[20px] flex flex-col">
      <div className="flex justify-between items-center mb-[20px]">
        <h2 className='text-2xl font-bold'>Your Playlists</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-[#111631] text-white px-2 py-2 text-[14px] rounded-lg"
        >
          + New
        </button>
      </div>

      <Modal isOpen={showCreateForm} onClose={() => setShowCreateForm(false)}>
        <h3 className="text-xl font-bold mb-4">Create New Playlist</h3>
        <input
          type="text"
          value={newPlaylistTitle}
          onChange={(e) => setNewPlaylistTitle(e.target.value)}
          placeholder="Enter playlist title"
          className="text-black p-2 border rounded-lg mb-4 w-full"
        />
        <div className="flex justify-end">
          <button
            onClick={handleCreatePlaylist}
            className="bg-[#6200ff] text-white px-4 py-2 rounded-lg mr-2"
          >
            Add Playlist
          </button>
        </div>
      </Modal>

      {playlists.length === 0 ? (
        <div className='mx-auto my-[30px] opacity-40'>No Playlists yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-card p-4 bg-[#111631] rounded-lg shadow-lg cursor-pointer">
              <h3 className="text-[14px] font-[500] mb-2">{playlist.title}</h3>
              <p className="text-sm text-gray-400">{playlist.songCount} songs</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;
