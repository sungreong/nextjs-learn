import {API_URL} from "./../constants";
async function getProviders(id:string){
    console.log(`fetching provider ${Date.now()}`)
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw new Error('error');
    const response = await fetch(`${API_URL}/${id}/providers`);
    return response.json();
}

export default async function MovieProviders({id} : {id : string}) {
    const provider = await getProviders(id);
    return <h6>{JSON.stringify(provider)}</h6>
}