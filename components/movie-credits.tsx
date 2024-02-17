import { API_URL } from "../app/(home)/page";
async function getCredits(id:string){
    console.log(`fetching credit ${Date.now()}`)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw new Error('error');
    const response = await fetch(`${API_URL}/${id}/credits`);
    return response.json();
}

export default async function MovieCredits({id} : {id : string}) {
    const credit = await getCredits(id);
    return <h6>{JSON.stringify(credit)}</h6>
}