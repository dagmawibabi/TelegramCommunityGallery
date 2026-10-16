import { redirect } from "@sveltejs/kit";
import { s as safeNextPath } from "../../../../chunks/site.js";
const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code");
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const next = safeNextPath(url.searchParams.get("next"));
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      redirect(303, next);
    }
  } else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      redirect(303, next);
    }
  }
  redirect(303, "/?authError=1");
};
export {
  GET
};
