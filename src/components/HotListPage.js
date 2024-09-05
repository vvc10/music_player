import axios from 'axios';
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { weeklyAlbums } from '../db/MusicDb';
import AlbumPageAlbums from './AlbumPageAlbums';
import FeaturedArtists from './FeaturedArtists';
import { firestore } from './firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

const HotListPage = () => {

    const [albumList, setAlbumList] = useState([]);
    const { id } = useParams();

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


    const [likeCount, setLikeCount] = useState(() => {
        return parseInt(localStorage.getItem(`likeCount_${id}`)) || 0;
    });

    useEffect(() => {
        localStorage.setItem(`likeCount_${id}`, likeCount.toString());
    }, [likeCount, id]);



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
                            <i class="fa fa-play"></i> Play</button>
                        <button className='like_btn' onClick={() => setLikeCount(prevCount => prevCount + 1)}>
                            <i class="fa fa-heart"></i></button>
                    </div>
                </div>
                <div className='ap-div-body'>
                    <div className='ap-div-body'>
                    {albumList && albumList.tracks && albumList.tracks.items && (
              albumList.tracks.items.map((track, index) => (
                <AlbumPageAlbums key={index} album={track} />
              ))
            )}
                    </div>
                </div>

            </div>
            <div className='ap-div-r'>
                <div className='apdr-about'>
                    <label>About</label>
                    {/* <p> {albumList.description}</p>
            <span>{albumList.featuredArtists}</span> */}
                </div>
                <div className='apdr-featured'>
                    <label>Featured Artists</label>
                    {/* {albumList.album_total_songs && typeof albumList.album_total_songs === 'object' && albumList.album_total_songs.constructor === Map && Array.from(albumList.album_total_songs.values()).map((song, index) => (
                <AlbumPageAlbums key={index} music={song} />
            ))} */}
                </div>
            </div>
        </div>

    );
}

export default HotListPage;
 