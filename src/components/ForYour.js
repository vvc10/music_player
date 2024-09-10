import React, { useState, useEffect } from 'react';
import { firestore } from './firebaseConfig';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase authentication
import PlaylistsPage from './PlayslistsPage';

const ForYour = () => {
    const [favorites, setFavorites] = useState([]);
    const [user, setUser] = useState(null); // State to hold authenticated user

    useEffect(() => {
        // Get the currently logged-in user
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Set the user in the state
                fetchFavorites(currentUser.uid); // Fetch favorites for the logged-in user
            } else {
                setUser(null); // No user logged in
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchFavorites = async (uid) => {
        try {
            const favoritesCollection = collection(firestore, 'favorites');
            const favoritesQuery = query(favoritesCollection, where('uid', '==', uid)); // Query for the specific user
            const snapshot = await getDocs(favoritesQuery);
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setFavorites(data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const handleAddToFavorites = async (song) => {
        if (!user) {
            alert('You need to be logged in to like a song!');
            return;
        }

        try {
            const favoritesCollection = collection(firestore, 'favorites');
            const songQuery = query(favoritesCollection, where("name", "==", song.name), where("uid", "==", user.uid));
            const snapshot = await getDocs(songQuery);

            if (snapshot.empty) {
                // Song does not exist for this user, add it to favorites
                await addDoc(favoritesCollection, { ...song, uid: user.uid });
                setFavorites((prevFavorites) => [...prevFavorites, { ...song, uid: user.uid }]);
            } else {
                console.log('Song with this title already exists in your favorites');
            }
        } catch (error) {
            console.error('Error adding song to favorites:', error);
        }
    };

    return (
        <div className="favorites-page">
            <PlaylistsPage />
            <h2 className="text-[20px] font-bold mx-4 my-2">Your Favorite Songs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-3 mx-4">
                {favorites.length === 0 ? (
                    <p>No favorite songs yet.</p>
                ) : (
                    favorites.map((song) => (
                        <div key={song.albumId} className="favorite-card p-2 bg-[#111631] rounded-lg shadow-lg cursor-pointer flex flex-row items-center gap-[10px]">
                            {song.albumImage && (
                                <img src={song.albumImage} alt={song.albumName} className="mb-2 rounded-lg w-[50px] h-[50px] object-cover" />
                            )}
                            <h3 className="text-[14px] font-[500]">{song.albumName}</h3>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ForYour;
