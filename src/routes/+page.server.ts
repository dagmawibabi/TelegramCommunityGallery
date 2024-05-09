// import * as db from '$lib/server/database';


/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    let res = await fetch('/api/get-communities');
    let data = await res.json()
    console.log(data);
    
    return {		
        allCommunities: data
    };
}