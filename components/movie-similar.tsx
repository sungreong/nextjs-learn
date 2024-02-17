import { API_URL } from "../app/(home)/page";
async function getSimilars(id:string){
    console.log(`fetching similar ${Date.now()}`)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw new Error('error');
    const response = await fetch(`${API_URL}/${id}/similar`);
    return response.json();
}

export default async function MovieSimilar({id} : {id : string}) {
    const similar = await getSimilars(id);
    return <h6>{JSON.stringify(similar)}</h6>
}