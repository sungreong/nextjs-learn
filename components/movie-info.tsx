
import { API_URL } from "../app/(home)/page";
async function getMovies(id:string){
    console.log(`fetching movie ${Date.now()}`)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export default async function MovieInfo({id} : {id : string}) {
    const movie = await getMovies(id);
    return <div>
      <h1>Movie Title : {movie.original_title}</h1>
      <h2>Release Date : {movie.release_date}</h2>
      <h2>Generes</h2>
      {
        movie.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)
      }

    </div>;
}