import { env } from '$env/dynamic/public';

export const SITE_HOST = 'telegram.dagmawi.dev';
export const SITE_URL = env.PUBLIC_SITE_URL || `https://${SITE_HOST}`;

const localOrigins = [
	'http://localhost:5173',
	'http://localhost:5174',
	'http://127.0.0.1:5173',
	'http://127.0.0.1:5174'
];

export function getAuthRedirectUrl(origin: string, path = '/auth/callback'): string {
	const base = localOrigins.includes(origin) ? origin : SITE_URL;
	return `${base}${path}`;
}

export function safeNextPath(next: string | null | undefined): string {
	if (!next) return '/';
	if (next.startsWith('/') && !next.startsWith('//')) return next;
	return '/';
}
