const load = async ({ locals: { claims }, cookies }) => {
  return {
    claims,
    cookies: cookies.getAll()
  };
};
export {
  load
};
