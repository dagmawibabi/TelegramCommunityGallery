// src/hooks.server.ts
import { redirect, type Handle } from "@sveltejs/kit";

import {dbConnect} from '$lib/db/db';



export const handle: Handle = async ({ event, resolve }) => {
	// Connect DB
	dbConnect().then((): void => {
		console.log("DB conected")
	}).catch(e => console.error(e))

    return resolve(event);
}