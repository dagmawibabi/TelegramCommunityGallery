import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { supabase, claims } }) => {
	if (!claims) {
		return json({ error: true, status: 401, body: 'Sign in required' }, { status: 401 });
	}

	const body = await request.json();
	const link = String(body.link ?? '')
		.toLowerCase()
		.trim();

	const payload = {
		name: String(body.name ?? '').trim(),
		link,
		description: String(body.description ?? ''),
		owner: body.owner ? String(body.owner) : '',
		tags: Array.isArray(body.tags) && body.tags.length > 0 ? body.tags : ['untagged'],
		type: String(body.type ?? ''),
		image_url: body.image_url ? String(body.image_url) : null,
		created_by: claims.sub
	};

	if (!payload.name || !payload.link || (payload.type !== 'channel' && payload.type !== 'group')) {
		return json({ error: true, status: 400, body: 'Missing required fields' }, { status: 400 });
	}

	const { error } = await supabase.from('communities').insert(payload);

	if (error) {
		console.error(error);
		const duplicate = error.code === '23505';
		return json(
			{
				error: true,
				status: duplicate ? 409 : 500,
				body: duplicate ? 'duplicate username' : 'Error creating document'
			},
			{ status: duplicate ? 409 : 500 }
		);
	}

	return json({ status: 200, body: 'Successfully created community' });
};
