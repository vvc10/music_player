import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { weeklyAlbums } from '../db/MusicDb';
import AlbumPageAlbums from './AlbumPageAlbums';
import FeaturedArtists from './FeaturedArtists';
import { firestore } from './firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

const AlbumsPage = () => {

    const [albumList, setAlbumList] = useState([]);
    const { musicId } = useParams();

    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                const musicCollection = collection(firestore, 'weekly_albums');
                const snapshot = await getDocs(musicCollection);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAlbumList(data);

            } catch (error) {
                console.error('Error fetching music data:', error);
            }
        };

        fetchMusicData();
    }, []);

    // Find music details or default to an empty object
    const musicDetails = albumList.find(music => music.id === musicId) || {};



    // const albumTotalSongs = musicDetails.album_total_songs || []; 
    const [likeCount, setLikeCount] = useState(() => {
        return parseInt(localStorage.getItem(`likeCount_${musicId}`)) || 0;
    });

    useEffect(() => {
        localStorage.setItem(`likeCount_${musicId}`, likeCount.toString());
    }, [likeCount, musicId]);

    const songList = musicDetails.album_total_songs;

    // Conditional rendering to handle when musicDetails is undefined
    if (!musicDetails) {
        return <p>Loading...</p>; // You can show a loading indicator or redirect to an error page
    }
    return (
        <div className='albumpage-div'>
            <div className='ap-div-l'>
                <div className='ap-div-head'>
                    <img src={musicDetails.cover} />
                    <div className='apdh_fl'>
                        <h4>{musicDetails.title}</h4>
                        <div className='apdh_fl_details'>
                            <label>{musicDetails.artist}</label>|
                            {/* <span>{musicDetails.album_total_songs.length} Songs</span>| */}
                            <span>{musicDetails.album_duration}</span>
                        </div>
                        <div className='apdl_fl_likescount'>{likeCount} likes</div>
                    </div>
                    <div className='apdh_fl_r'>
                        <button className='play_all_btn'>
                            <i class="fa fa-play"></i> Play</button>
                        <button className='like_btn' onClick={() => setLikeCount(prevCount => prevCount + 1)}>
                            <i class="fa fa-heart"></i></button>
                    </div>
                </div>
                <div className='ap-div-body'>
                    <div className='ap-div-body'>
                        {console.log('songList:>>', songList)}
                        {songList && <AlbumPageAlbums music={songList} />}

                    </div>
                </div>
            </div>
            <div className='ap-div-r'>
                <div className='apdr-about'>
                    <label>About</label>
                    <p> {musicDetails.description}</p>
                    <span>{musicDetails.featuredArtists}</span>
                </div>
                <div className='apdr-featured'>
                    <label>Featured Artists</label>
                    {musicDetails.album_total_songs && typeof musicDetails.album_total_songs === 'object' && musicDetails.album_total_songs.constructor === Map && Array.from(musicDetails.album_total_songs.values()).map((song, index) => (
                        <AlbumPageAlbums key={index} music={song} />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default AlbumsPage;
