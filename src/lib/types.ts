export type Community = {
	id?: string;
	name: string;
	link: string;
	description: string;
	owner: string | null | undefined;
	tags: string[];
	type: string;
	image_url?: string | null;
	created_by?: string | null;
};

export function mapCommunity(row: Record<string, unknown> | null | undefined): Community {
	return {
		id: typeof row?.id === 'string' ? row.id : undefined,
		name: String(row?.name ?? ''),
		link: String(row?.link ?? ''),
		description: String(row?.description ?? ''),
		owner: (row?.owner as string | null | undefined) ?? '',
		tags: Array.isArray(row?.tags) ? (row.tags as string[]) : [],
		type: String(row?.type ?? ''),
		image_url: (row?.image_url as string | null | undefined) ?? null,
		created_by: (row?.created_by as string | null | undefined) ?? null
	};
}
