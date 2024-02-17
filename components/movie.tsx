"use client";

interface IMovieProps {
    title: string;
    poster_path: string;
    id: number;
    release_date: string;
}
import Link from "next/link";
import styles from "../styles/movie.module.css";
import { useRouter } from "next/navigation";

export default function Movie({title, poster_path, id, release_date}: IMovieProps) {
    const router = useRouter();
    const onClick = () => {
        router.push(`/movies/${id}`);
    }
    // split date 
    const date = release_date.split('-');
    const year = date[0];
    const month = date[1];
    const day = date[2];

    return <div className={styles.movie}>
    <img src={poster_path} alt={title} onClick={onClick} />
    <Link href={`/movies/${id}`} key={id}>{title}({year}/{month})</Link>
  </div>
}