import { API_URL } from "../app/(home)/page";
async function getVideos(id:string){
    console.log(`fetching video ${Date.now()}`)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw new Error('error');
    const response = await fetch(`${API_URL}/${id}/videos`);
    return response.json();
}

export default async function MovieVideos({id} : {id : string}) {
    const videos = await getVideos(id);
    return <h6>{JSON.stringify(videos)}</h6>
}