/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    const res = await fetch('/api/get-communities');
    const data = await res.json()
    
    return {		
        allCommunities: data
    };
}