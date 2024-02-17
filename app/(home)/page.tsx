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

export const API_URL = 'https://nomad-movies.nomadcoders.workers.dev/movies';

export const metadata = {
  title: 'Home',
}
async function getMovies() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('fetching movies');
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export default async function HomePage() {
  const movies = await getMovies();
  return <div>
    {
      movies.map(movie => (
        <li key={movie.id}>
          <Link href={`/movies/${movie.id}`} key={movie.id}>{movie.title}</Link>
        </li>
      ))
    }
  </div>
}