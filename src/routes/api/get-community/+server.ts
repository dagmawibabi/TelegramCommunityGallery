import { json } from '@sveltejs/kit';
import { Community } from '../../../models/community.model';


export async function GET({ request, url }) {
	const link = url.searchParams.get('link')
    const fetchedCommunity = await Community.find({ link });
    // console.log(fetchedCommunity)
	return json(fetchedCommunity);
}