
import { API_URL } from "../app/(home)/page";
export async function getMovies(id:string){
    console.log(`fetching movie ${Date.now()}`)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}
import style2 from "../styles/movie-info.module.css";

export default async function MovieInfo({id} : {id : string}) {
    const movie = await getMovies(id);
    return (
        <div className={style2.container}>
          <img
            src={movie.poster_path}
            className={style2.poster}
            alt={movie.title}
          />
          <div className={style2.info}>
            <h1 className={style2.title}>{movie.title}</h1>
            <h3>⭐️ {movie.vote_average.toFixed(1)}</h3>
            <p>{movie.overview}</p>
            <a href={movie.homepage} target={"_blank"}>
              Homepage &rarr;
            </a>
          </div>
        </div>
      );
}