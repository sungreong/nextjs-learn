"use client";

import {API_URL} from "./../constants";
import React from 'react';
import { useEffect, useState } from 'react';

async function getProviders(id:string){
    console.log(`fetching provider ${Date.now()}`)
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw new Error('error');
    const response = await fetch(`${API_URL}/${id}/providers`);
    return response.json();
}

export default async function MovieProviders({id} : {id : string}) {
    const [locale, setLocale] = useState<string>('');
    const [localeProvider, setLocaleProvider] = useState<any>({});
    const [providerKeys, setProviderKeys] = useState<string[]>([]);
  
    useEffect(() => {
        const fetchProviders = async () => {
          const provider = await getProviders(id);
          const keys = Object.keys(provider);
          setProviderKeys(keys);
          // 기본적으로 첫 번째 키를 현재 로케일로 설정
          setLocale(keys[0]);
          setLocaleProvider(provider[keys[0]]);
          
        };
    
        fetchProviders();
      }, [id]);
    // provider에서 key 값만 뽑는 코드
    useEffect(() => {
        // locale 상태가 변경될 때마다 localeProvider 업데이트
        const updateLocaleProvider = async () => {
          const provider = await getProviders(id); // 재호출이 필요한 경우
          setLocaleProvider(provider[locale]);
          console.log(Object.keys(localeProvider));
        };
    
        if (locale) updateLocaleProvider();
      }, [locale, id]);

      return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            <select 
                value={locale} 
                onChange={(e) => setLocale(e.target.value)}
                style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxShadow: '0 2px 3px #eaeaea',
                background: 'white',
                cursor: 'pointer',
                outline: 'none',
                fontSize: '16px',
                color: '#333',
                appearance: 'none', // 이 속성은 기본 화살표를 제거합니다. 대신 CSS로 커스텀 화살표를 추가할 수 있습니다.
                }}
            >
                {providerKeys.map((key) => (
                <option key={key} value={key}>
                    {key}
                </option>
                ))}
            </select>
            </div>
          


          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>


        
            {localeProvider?.buy?.length > 0 && (
                <div>
                <h3>Buy Options:</h3>
                <div>
                    {localeProvider.buy.map((item: any, index: number) => (
                    <img key={index} src={item.logo_path} alt={item.provider_name} style={{ width: 100, height: "auto", margin: 10 }} />
                    ))}
                </div>
                </div>
            )}

            {localeProvider?.rent?.length > 0 && (
            <div>
            <h3>Rent Options:</h3>
            <div>
                {localeProvider.rent.map((item: any, index: number) => (
                <img key={index} src={item.logo_path} alt={item.provider_name} style={{ width: 100, height: "auto", margin: 10 }} />
                ))}
            </div>
            </div>
            )}
            </div>
        </div>
      );
    };
    