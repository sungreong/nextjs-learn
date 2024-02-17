import { Suspense } from 'react';
import {API_URL} from '../../../(home)/page';
import MovieInfo from '../../../../components/movie-info';
import MovieVideos from '../../../../components/movie-videos';
import MovieCredits from '../../../../components/movie-credits';    
import MovieSimilar from '../../../../components/movie-similar';
import MovieProviders from '../../../../components/movie-providers';

// async function getMovies(id:string){
//     console.log(`fetching movie ${Date.now()}`)
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     const response = await fetch(`${API_URL}/${id}`);
//     return response.json();
// }


// async function getVideos(id:string){
//     console.log(`fetching video ${Date.now()}`)
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     const response = await fetch(`${API_URL}/${id}/videos`);
//     return response.json();
// }


export default async function MovieDetail({params : {id}} : {params : {id : string}}) {
    // console.log(id);
    // console.log('fetching movie and video');
    //  순서대로 실행되는 문제
    // const movie = await getMovies(id);
    // const videos = await getVideos(id);
    // Promise.all을 사용하여 동시에 실행
    // 이 방식은 2개가 동시에 실행되지만, 완료가 되어야 리턴이 되기 때문에 느림
    // const [movie, videos] = await Promise.all([getMovies(id), getVideos(id)])
    // SUSPENSE를 사용하여 동시에 실행
    // 하나만 완료되어도 리턴이 되기 때문에 빠름
    // console.log('fetched movie and video');
    
  return <div>
    <h1>Movie Detail page</h1>
    <h2>Movie ID: {id}</h2>
    <Suspense fallback= {<h1>Loading movie info</h1>}>
    <MovieInfo id={id} />
    </Suspense>
    <Suspense fallback= {<h1>Loading video info</h1>}>
    <MovieVideos id={id} /> 
    </Suspense>
    <Suspense fallback= {<h1>Loading credit info</h1>}>
    <MovieCredits id={id} />
    </Suspense>
    <Suspense fallback= {<h1>Loading similar info</h1>}>
    <MovieSimilar id={id} />
    </Suspense>
    <Suspense fallback= {<h1>Loading providers info</h1>}>
    <MovieProviders id={id} />
    </Suspense>
    
  </div>;
}