/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {

    let username = params.username

    let community = await fetch(`/api/get-community?link=${username}`)
    let res = await community.json()
    
    return {		
        community: res
    };
}