export const rawRepo = (values = {}) => ({
  id: 1,
  name: "example",
  private: false,
  visibility: "public",
  owner: { login: "Obedience-Corp" },
  description: "An example tool",
  fork: false,
  archived: false,
  ...values,
});
export const rawRelease = (values = {}) => ({
  id: 10,
  tag_name: "v1.0.0",
  name: "First release",
  draft: false,
  prerelease: false,
  published_at: "2026-09-01T12:00:00Z",
  updated_at: "2026-09-02T12:00:00Z",
  body: "- A real improvement",
  ...values,
});
export const response = (rows, headers = {}) =>
  new Response(JSON.stringify(rows), { headers });
