import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import AlbumPageAlbums from './AlbumPageAlbums';

const AlbumsPage = () => {
    const [albumList, setAlbumList] = useState([]);
    const { id } = useParams();
    const [likeCount, setLikeCount] = useState(() => parseInt(localStorage.getItem(`likeCount_${id}`)) || 0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokenResponse = await axios.post(
                    'https://accounts.spotify.com/api/token',
                    'grant_type=client_credentials',
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Basic ' + btoa('4e02a61ae0be45978765ad1d03a3e018:8de8e36efa3242e8a621ddf4bbc8ae1d')
                        }
                    }
                );

                const accessToken = tokenResponse.data.access_token;

                const albumResponse = await axios.get(
                    `https://api.spotify.com/v1/albums/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }
                );

                setAlbumList(albumResponse.data);
            } catch (error) {
                console.error('Error fetching album:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        localStorage.setItem(`likeCount_${id}`, likeCount.toString());
    }, [likeCount, id]);

    const handleLike = async (song) => {
        try {
            const favoritesCollection = collection(firestore, 'favorites');
            await addDoc(favoritesCollection, song);
            setLikeCount((prevCount) => prevCount + 1);
        } catch (error) {
            console.error('Error adding song to favorites:', error);
        }
    };

    return (
        <div className='albumpage-div'>
            <div className='ap-div-l'>
                <div className='ap-div-head'>
                    {albumList && albumList.images && albumList.images.length > 0 && (
                        <img src={albumList.images[0].url} alt="Album Cover" />
                    )}
                    <div className='apdh_fl'>
                        {albumList && <h4>{albumList.name}</h4>}
                        <div className='apdh_fl_details'>
                            {albumList && albumList.artists && (
                                <label>{albumList.artists.map(artist => artist.name).join(', ')}</label>
                            )}
                            <span>{albumList.total_tracks} Songs</span>|
                            <span>{albumList.album_duration}</span>
                        </div>
                        <div className='apdl_fl_likescount'>{likeCount} likes</div>
                    </div>
                    <div className='apdh_fl_r'>
                        <button className='play_all_btn'>
                            <i className="fa fa-play"></i> Play
                        </button>
                        <button className='like_btn' onClick={() => handleLike(albumList)}>
                            <i className="fa fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div className='ap-div-body'>
                    <AlbumPageAlbums />
                </div>
            </div>
            <div className='ap-div-r'>
                <div className='apdr-about'>
                    <label>About</label>
                </div>
                <div className='apdr-featured'>
                    <label>Featured Artists</label>
                </div>
            </div>
        </div>
    );
}

export default AlbumsPage;
