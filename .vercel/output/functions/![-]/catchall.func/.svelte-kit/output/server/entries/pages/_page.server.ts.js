import { m as mapCommunity } from "../../chunks/types.js";
const load = async ({ locals: { supabase } }) => {
  const { data, error } = await supabase.from("communities").select().order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to load communities:", error.message);
  }
  return {
    allCommunities: (data ?? []).map(mapCommunity),
    dbError: error?.message ?? null
  };
};
export {
  load
};
