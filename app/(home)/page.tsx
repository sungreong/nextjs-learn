// "use client"
// import { useEffect, useState } from 'react'
// export default function Page() {
//   // native react  (client only)
//   const [isLoading, setIsLoading] = useState(true)
//   const [movies ,setMovies] = useState([])
//   const getMovies = async () => {
//     const res = await fetch('https://nomad-movies.nomadcoders.workers.dev/movies')
//     const data = await res.json();
//     setMovies(data);
//     setIsLoading(false)
//   }
//   useEffect(() => {
//     getMovies()
//   }, [])
//   return <div>
//     <h1>Home</h1>
//     {isLoading  ? "Loading..." : JSON.stringify(movies)}
//   </div>;
// }

import Link from "next/link";
import Movie from "../../components/movie";
import styles from "./../../styles/home.module.css";
import {API_URL} from "../../constants";


export const metadata = {
  title: 'Home',
}
async function getMovies() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('fetching movies');
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export default async function HomePage() {
  const movies = await getMovies();
  return <div className={styles.container}>
    {
    
      movies.map(movie => (
        // <li key={movie.id}>
        //   <Link href={`/movies/${movie.id}`} key={movie.id}>{movie.title}</Link>
        // </li>

        // <div key={movie.id}>
        //   <img src={movie.poster_path} alt={movie.title} />
        //   <Link href={`/movies/${movie.id}`} key={movie.id}>{movie.title}</Link>
        // </div>
        <Movie 
        key={movie.id}
        id = {movie.id}
        title = {movie.title}
        poster_path = {movie.poster_path}
        release_date = {movie.release_date}
        />

      ))
    }
  </div>
}