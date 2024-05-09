import { json } from '@sveltejs/kit';
import { Community } from '../../../models/community.model';

export async function GET() {
    const fetchedCommunities = await Community.find();
	return json(fetchedCommunities);
}