"use client";
import {API_URL} from "./../constants";
import React, { useState, useEffect } from 'react';

async function getSimilars(id:string){
    console.log(`fetching similar ${Date.now()}`)
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw new Error('error');
    const response = await fetch(`${API_URL}/${id}/similar`);
    return response.json();
}

export default async function MovieSimilar({id} : {id : string}) {
    const [similars, setSimilars] = React.useState<any[]>([]);
    const [visibleCount, setVisibleCount] = useState(5); // 초기에 보여질 크레딧 수

    React.useEffect(() => {
        const fetchSimilars = async () => {
          const similarMovies = await getSimilars(id);
          // 출시 날짜를 기준으로 내림차순 정렬
          const sortedSimilars = similarMovies.sort((a, b) => b.release_date.localeCompare(a.release_date));
          // 최대 5개의 항목만 선택
          setSimilars(sortedSimilars);
        };
    
        fetchSimilars();
      }, [id]);
    const showMoreHandler = () => {
    setVisibleCount((prevCount) => prevCount + 5); // 더 보기 클릭 시 5명씩 추가로 표시
    };
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {similars.slice(0, visibleCount).map((movie) => (
        <div key={movie.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
          <img
            src={movie.poster_path}
            alt={movie.title}
            style={{ width: '100%', height: 'auto' }}
          />
          <h3 style={{ textAlign: 'center', fontSize: '16px', marginTop: '10px' }}>{movie.title}</h3>
          <p style={{ textAlign: 'center', fontSize: '14px' }}>{movie.release_date}</p>
        </div>
      ))}
      {visibleCount < similars.length && (
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
    )
}