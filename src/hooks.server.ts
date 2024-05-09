// src/hooks.server.ts
import { type Handle } from "@sveltejs/kit";

import { dbConnect } from '$lib/db/db';

// Connect DB
export const handle: Handle = async ({ event, resolve }) => {
	dbConnect().then((): void => {
		console.log("DB conected")
	}).catch(e => console.error(e))

    return resolve(event);
}