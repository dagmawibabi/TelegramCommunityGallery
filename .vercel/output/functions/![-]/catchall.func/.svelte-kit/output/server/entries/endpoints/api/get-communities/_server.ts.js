import { json } from "@sveltejs/kit";
import { m as mapCommunity } from "../../../../chunks/types.js";
const GET = async ({ locals: { supabase } }) => {
  const { data, error } = await supabase.from("communities").select().order("created_at", { ascending: false });
  if (error) {
    return json({ status: 500, body: error.message }, { status: 500 });
  }
  return json((data ?? []).map(mapCommunity));
};
export {
  GET
};
