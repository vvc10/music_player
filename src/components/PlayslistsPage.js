import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from './firebaseConfig';
import Modal from './Modal.js'; // Import the Modal component

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlistsCollection = collection(firestore, 'playlists');
        const snapshot = await getDocs(playlistsCollection);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async () => {
    if (!newPlaylistTitle) return;

    try {
      const playlistsCollection = collection(firestore, 'playlists');
      await addDoc(playlistsCollection, {
        title: newPlaylistTitle,
        songCount: 0 // Initialize with 0 songs or any default value
      });

      setNewPlaylistTitle('');
      setShowCreateForm(false);
      // Fetch updated playlists
      const snapshot = await getDocs(playlistsCollection);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlaylists(data);
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
          {/* <button
            onClick={() => setShowCreateForm(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button> */}
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
