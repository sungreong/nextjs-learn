"use client";
import {API_URL} from "./../constants";
import React, { useState, useEffect } from 'react';

async function getCredits(id:string){
    console.log(`fetching credit ${Date.now()}`)
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw new Error('error');
    const response = await fetch(`${API_URL}/${id}/credits`);
    return response.json();
}

export default async function MovieCredits({id} : {id : string}) {
    const [credits, setCredits] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5); // 초기에 보여질 크레딧 수
  
    useEffect(() => {
      const fetchCredits = async () => {
        const fetchedCredits = await getCredits(id);
        // 유명세(popularity) 기준으로 내림차순 정렬
        fetchedCredits.sort((a, b) => b.popularity - a.popularity);
        setCredits(fetchedCredits);
      };
  
      fetchCredits();
    }, [id]);
    const showMoreHandler = () => {
        setVisibleCount((prevCount) => prevCount + 5); // 더 보기 클릭 시 5명씩 추가로 표시
      };
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {credits.slice(0, visibleCount).map((credit) => (
            <div key={credit.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '185px' }}>
              <img
                src={credit.profile_path}
                alt={credit.name}
                style={{ width: '100%', height: 'auto' }}
              />
              <div style={{ textAlign: 'center' }}>
                <div>{credit.name} ({credit.character})</div>
              </div>
            </div>
          ))}
          {visibleCount < credits.length && (
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
      );
    };