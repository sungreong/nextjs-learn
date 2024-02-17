import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-videos.module.css";

async function getVideos(id:string){
    console.log(`fetching video ${Date.now()}`)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw new Error('error');
    const response = await fetch(`${API_URL}/${id}/videos`);
    return response.json();
}

export default async function MovieVideos({id} : {id : string}) {
    const videos = await getVideos(id);
    return <div className={styles.container}>
        {
            videos.filter(video => video.official === true).map(
                video => 
                <iframe key={video.id} 
                src={`https://www.youtube.com/embed/${video.key}`} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen 
                title={video.name}
                 ></iframe>)
        }
    </div>
}