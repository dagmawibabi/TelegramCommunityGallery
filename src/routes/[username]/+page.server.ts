import { mapCommunity } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase }, params }) => {
	const username = params.username;

	const [{ data: communityRows, error: communityError }, { data: allRows, error: allError }] =
		await Promise.all([
			supabase.from('communities').select().eq('link', username).limit(1),
			supabase.from('communities').select().order('created_at', { ascending: false })
		]);

	if (communityError) {
		console.error('Failed to load community:', communityError.message);
	}
	if (allError) {
		console.error('Failed to load communities:', allError.message);
	}

	return {
		community: (communityRows ?? []).map(mapCommunity),
		allCommunities: (allRows ?? []).map(mapCommunity)
	};
};
