import { mapCommunity } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase
		.from('communities')
		.select()
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Failed to load communities:', error.message);
	}

	return {
		allCommunities: (data ?? []).map(mapCommunity),
		dbError: error?.message ?? null
	};
};
