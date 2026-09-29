export const ORGANIZATION = "Obedience-Corp";
const festivalProducts = {
  festival: "festival",
  fest: "fest",
  camp: "camp",
  "festival-installer": "installer",
};

export function versionSlug(tag) {
  return /^[a-zA-Z0-9][a-zA-Z0-9._+-]*$/.test(tag)
    ? tag
    : `~${Buffer.from(tag).toString("base64url")}`;
}

export function normalizeRepository(raw) {
  // Explicit public-only boundary, even when the caller supplies a powerful token.
  if (raw.private === true || (raw.visibility && raw.visibility !== "public"))
    return null;
  if (
    raw.private !== false ||
    raw.owner?.login?.toLowerCase() !== ORGANIZATION.toLowerCase() ||
    !Number.isSafeInteger(raw.id) ||
    !/^[\w.-]+$/.test(raw.name ?? "")
  )
    throw new Error("Invalid public repository payload");
  return {
    id: raw.id,
    slug: raw.name.toLowerCase(),
    name: raw.name,
    description:
      typeof raw.description === "string" ? raw.description.trim() : "",
    archived: raw.archived === true,
    fork: raw.fork === true,
    url: `https://github.com/${ORGANIZATION}/${raw.name}`,
  };
}

function date(value) {
  if (typeof value !== "string" || !Number.isFinite(Date.parse(value)))
    throw new Error("Invalid release date");
  return new Date(value).toISOString();
}

export function normalizeRelease(raw, repo) {
  if (raw.draft === true) return null;
  if (
    raw.draft !== false ||
    typeof raw.prerelease !== "boolean" ||
    !Number.isSafeInteger(raw.id) ||
    typeof raw.tag_name !== "string" ||
    !raw.tag_name.trim() ||
    (raw.body != null && typeof raw.body !== "string")
  )
    throw new Error(`Invalid release payload: ${repo.name}`);
  const publishedAt = date(raw.published_at);
  const updatedAt = date(raw.updated_at ?? raw.published_at);
  return {
    id: raw.id,
    repo: repo.slug,
    tag: raw.tag_name,
    slug: versionSlug(raw.tag_name),
    name:
      typeof raw.name === "string" && raw.name.trim()
        ? raw.name.trim()
        : raw.tag_name,
    publishedAt,
    updatedAt: updatedAt < publishedAt ? publishedAt : updatedAt,
    prerelease: raw.prerelease,
    sourceUrl: `${repo.url}/releases/tag/${encodeURIComponent(raw.tag_name)}`,
    body: (raw.body ?? "").replace(/\r\n/g, "\n").trim(),
  };
}

export const sortReleases = (releases) =>
  [...releases].sort(
    (a, b) =>
      b.publishedAt.localeCompare(a.publishedAt) ||
      a.repo.localeCompare(b.repo) ||
      a.tag.localeCompare(b.tag),
  );

export function isFestivalRelease(release) {
  return Object.hasOwn(festivalProducts, release.repo);
}
export function releaseHref(release) {
  return isFestivalRelease(release)
    ? `https://fest.build/releases/${festivalProducts[release.repo]}/${release.slug}`
    : `/releases/${release.repo}/${release.slug}/`;
}
export const releaseTitle = (release) => `${release.repo} ${release.tag}`;
export const dateLabel = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export function releaseSummary(release) {
  const line = release.body
    .split("\n")
    .find(
      (line) =>
        /^[-*] /.test(line) &&
        !/^[-*] (?:\d+ |`?(?:fest|camp|festival)`? v|https?:)/i.test(line),
    );
  const text = line
    ?.replace(/^[-*] /, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^[a-f0-9]{7,40}\s+/i, "")
    .replace(/^\[obey-campaign:[^\]]+\]\s*/, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+by @\S+\s+in\s*$/, "")
    .replace(/\s*\(#\d+\)/g, "")
    .replace(/[*`]/g, "")
    .trim();
  return text
    ? text.length > 180
      ? `${text.slice(0, 177)}…`
      : text
    : `Release notes and downloads for ${releaseTitle(release)}.`;
}
