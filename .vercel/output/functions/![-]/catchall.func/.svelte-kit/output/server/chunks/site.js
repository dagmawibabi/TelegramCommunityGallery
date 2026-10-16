import { p as public_env } from "./shared-server.js";
const SITE_HOST = "telegram.dagmawi.dev";
public_env.PUBLIC_SITE_URL || `https://${SITE_HOST}`;
function safeNextPath(next) {
  if (!next) return "/";
  if (next.startsWith("/") && !next.startsWith("//")) return next;
  return "/";
}
export {
  safeNextPath as s
};
