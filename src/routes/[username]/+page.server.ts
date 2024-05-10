/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
    const username = params.username
    const community = await fetch(`/api/get-community?link=${username}`)
    const res = await community.json()

    const allCommunities = await fetch('/api/get-communities');
    const res2 = await allCommunities.json()
    
    return ({		
        community: res,
        allCommunities: res2
    });
}