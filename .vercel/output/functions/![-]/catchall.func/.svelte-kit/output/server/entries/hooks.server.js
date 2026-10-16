import { createServerClient } from "@supabase/ssr";
import "@sveltejs/kit";
import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_PUBLISHABLE_KEY } from "../chunks/public.js";
const handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (cookiesToSet, headers) => {
        const secure = event.url.protocol === "https:" || event.url.hostname === "telegram.dagmawi.dev";
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: "/", secure });
        });
        if (headers && Object.keys(headers).length > 0) {
          event.setHeaders(headers);
        }
      }
    }
  });
  const { data: claimsData } = await event.locals.supabase.auth.getClaims();
  event.locals.claims = claimsData?.claims ?? null;
  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range" || name === "x-supabase-api-version";
    }
  });
};
export {
  handle
};
