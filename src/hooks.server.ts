import { type Handle } from "@sveltejs/kit";
import { dbConnect } from '$lib/db/db';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from "@auth/sveltekit/providers/github";


import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

// Connect DB
export const handle: Handle = async ({ event, resolve }) => {
	
    try {
        await dbConnect();
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection error:", error);
    }

    const githubProvider = GitHub({
        clientId: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET
    });

    const authConfig = {
        providers: [githubProvider]
    };

    // Initialize authentication middleware
    const auth = SvelteKitAuth(authConfig);

    return auth.handle({ event, resolve });
};
