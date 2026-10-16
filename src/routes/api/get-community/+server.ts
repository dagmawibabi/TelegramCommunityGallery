import { json } from '@sveltejs/kit';
import { mapCommunity } from '$lib/types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const link = url.searchParams.get('link');

	const { data, error } = await supabase.from('communities').select().eq('link', link ?? '');

	if (error) {
		return json({ status: 500, body: error.message }, { status: 500 });
	}

	return json((data ?? []).map(mapCommunity));
};
