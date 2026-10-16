function mapCommunity(row) {
  return {
    id: typeof row?.id === "string" ? row.id : void 0,
    name: String(row?.name ?? ""),
    link: String(row?.link ?? ""),
    description: String(row?.description ?? ""),
    owner: row?.owner ?? "",
    tags: Array.isArray(row?.tags) ? row.tags : [],
    type: String(row?.type ?? ""),
    image_url: row?.image_url ?? null,
    created_by: row?.created_by ?? null
  };
}
export {
  mapCommunity as m
};
