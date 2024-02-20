"use client";

import {API_URL} from "./../constants";
import styles from "../styles/movie-videos.module.css";
import React, { useState, useEffect } from 'react';


async function getVideos(id:string){
    console.log(`fetching video ${Date.now()}`)
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw new Error('error');
    const response = await fetch(`${API_URL}/${id}/videos`);
    return response.json();
}

export default async function MovieVideos({id} : {id : string}) {
    const [videos, setVideos] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3); // 초기에 보여질 크레딧 수
    useEffect(() => {
        const fetchCredits = async () => {
          const videos = await getVideos(id);
          const filtered_videos = videos.filter(video => video.official === true)
          setVideos(filtered_videos);
        };
    
        fetchCredits();
      }, [id]);
    const showMoreHandler = () => {
        setVisibleCount((prevCount) => prevCount + 3); // 더 보기 클릭 시 5명씩 추가로 표시
    };
    return <div className={styles.container}>
        {
            videos.slice(0, visibleCount).map(
                video => 
                <iframe key={video.id} 
                src={`https://www.youtube.com/embed/${video.key}`} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen 
                title={video.name}
                 ></iframe>)
        }
        {visibleCount < videos.length && (
            <button onClick={showMoreHandler} style={{ 
                marginTop: '20px', 
                background: 'transparent', 
                border: 'none', 
                fontSize: '30px',
                color: 'white', // 원하는 색상으로 조정
                cursor: 'pointer'
              }}>...</button>
          )}
    </div>
}