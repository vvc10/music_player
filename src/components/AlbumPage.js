import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { weeklyAlbums } from '../db/MusicDb';
import AlbumPageAlbums from './AlbumPageAlbums';
import FeaturedArtists from './FeaturedArtists';
const AlbumsPage = () => {
    const { musicId } = useParams();

    const musicDetails = weeklyAlbums.find(music => music.id.toString() === musicId);
    const [likeCount, setLikeCount] = useState(() => {
        // Retrieve like count from local storage or default to 0
        return parseInt(localStorage.getItem(`likeCount_${musicId}`)) || 0;
    });
    // Save like count to local storage when it changes
    useEffect(() => {
        localStorage.setItem(`likeCount_${musicId}`, likeCount.toString());
    }, [likeCount, musicId]);

    console.log('musicId in album page', musicDetails);

    return (
        <div className='albumpage-div'>
            <div className='ap-div-l'>
                <div className='ap-div-head'>
                    <img src={musicDetails.cover} />
                    <div className='apdh_fl'>
                        <h4>{musicDetails.title}</h4>
                        <div className='apdh_fl_details'>
                            <label>{musicDetails.artist}</label>|
                            <span>{musicDetails.album_total_songs.length} Songs</span>|
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
                    {musicDetails.album_total_songs.map((music, index) => (
                        <AlbumPageAlbums key={index} music={music} />
                    ))}
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
                    {
                        musicDetails.totalFeaturedArtists.map((music, index) => (

                            <FeaturedArtists key={index} music={music} />
                        ))
                    }
                </div>

            </div>
        </div>
    );
}

export default AlbumsPage;
