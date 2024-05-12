import { type Handle } from "@sveltejs/kit";
import { dbConnect } from '$lib/db/db';
import { SvelteKitAuth } from '@auth/sveltekit';

// Connect DB
export const handle: Handle = async ({ event, resolve }) => {
	
    try {
        await dbConnect();
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection error:", error);
    }

    const authConfig = {
        providers: [], // No providers specified
        trustHost: true,
        secret: "true"
    };

    // Initialize authentication middleware
    const auth = SvelteKitAuth(authConfig);

    return auth.handle({ event, resolve });
};
