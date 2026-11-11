export const ORGANIZATION = "Obedience-Corp";
const festivalProducts = {
  festival: "festival",
  fest: "fest",
  camp: "camp",
  "festival-installer": "installer",
};

// obey-releases holds three kinds of release: Obey (v*), Festival App, and
// internal App or companion builds. fest.build owns the Obey and App pages,
// so this site links to them by the same version slugs fest.build uses.
const SHARED_RELEASE_REPO = "obey-releases";
const releaseProducts = { obey: "Obey", app: "Festival App" };
// Public App history starts at the first release offered to everyone.
export const FIRST_PUBLIC_APP_VERSION = "0.1.7";
const APP_COMPONENTS = /\n*Release components:\n```json\n([\s\S]*?)\n```\s*$/;
const SEMVER = /^(\d+)\.(\d+)\.(\d+)$/;

function atLeast(version, minimum) {
  const a = version.match(SEMVER).slice(1).map(Number);
  const b = minimum.match(SEMVER).slice(1).map(Number);
  return (a[0] - b[0] || a[1] - b[1] || a[2] - b[2]) >= 0;
}

// Stable App releases use app-vX.Y.Z. Early releases use app-test-<source SHA>
// with the release operator's components block naming the same source.
// Never throws, so one odd release cannot stop the organization sync.
export function appReleaseVersion(raw) {
  const tag = raw.tag_name;
  let version = tag.match(/^app-v(\d+\.\d+\.\d+)$/)?.[1] ?? null;
  const test = tag.match(/^app-test-([0-9a-f]{40})$/);
  if (test) {
    const block = (raw.body ?? "").replace(/\r\n/g, "\n").match(APP_COMPONENTS);
    if (!block) return null;
    let components;
    try {
      components = JSON.parse(block[1]);
    } catch {
      return null;
    }
    if (components?.source !== test[1] || typeof components.version !== "string")
      return null;
    version = components.version;
  }
  if (!version || !SEMVER.test(version) || !atLeast(version, FIRST_PUBLIC_APP_VERSION))
    return null;
  return version;
}

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
  let product = null;
  let appVersion = null;
  if (repo.slug === SHARED_RELEASE_REPO) {
    appVersion = appReleaseVersion(raw);
    if (appVersion) product = "app";
    else if (/^v\d/.test(raw.tag_name)) product = "obey";
    else return null;
  }
  const publishedAt = date(raw.published_at);
  const updatedAt = date(raw.updated_at ?? raw.published_at);
  let body = (raw.body ?? "").replace(/\r\n/g, "\n").trim();
  if (appVersion)
    body = body
      .replace(APP_COMPONENTS, "")
      .replace(/^# Festival App [^\n]*\n+/, "")
      .trim();
  return {
    id: raw.id,
    repo: repo.slug,
    ...(product ? { product } : {}),
    tag: raw.tag_name,
    slug: appVersion ? `v${appVersion}` : versionSlug(raw.tag_name),
    name:
      typeof raw.name === "string" && raw.name.trim()
        ? raw.name.trim()
        : raw.tag_name,
    publishedAt,
    updatedAt: updatedAt < publishedAt ? publishedAt : updatedAt,
    prerelease: raw.prerelease,
    sourceUrl: `${repo.url}/releases/tag/${encodeURIComponent(raw.tag_name)}`,
    body,
  };
}

// A stable app-vX.Y.Z replaces the early build of the same version.
export function selectReleases(releases) {
  const kept = new Map();
  const stable = (release) => release.tag.startsWith("app-v");
  for (const release of releases) {
    const key = `${release.product ?? ""}/${release.slug}`;
    const current = kept.get(key);
    if (
      release.product !== "app" ||
      !current ||
      (stable(release) && !stable(current)) ||
      (stable(release) === stable(current) &&
        release.publishedAt > current.publishedAt)
    )
      kept.set(release.product === "app" ? key : `id:${release.id}`, release);
  }
  return [...kept.values()];
}

export const sortReleases = (releases) =>
  [...releases].sort(
    (a, b) =>
      b.publishedAt.localeCompare(a.publishedAt) ||
      a.repo.localeCompare(b.repo) ||
      a.tag.localeCompare(b.tag),
  );

export function isFestivalRelease(release) {
  return (
    Object.hasOwn(festivalProducts, release.repo) ||
    (release.repo === SHARED_RELEASE_REPO && Boolean(release.product))
  );
}
export function releaseHref(release) {
  if (release.repo === SHARED_RELEASE_REPO && release.product)
    return `https://fest.build/releases/${release.product}/${release.slug}`;
  return isFestivalRelease(release)
    ? `https://fest.build/releases/${festivalProducts[release.repo]}/${release.slug}`
    : `/releases/${release.repo}/${release.slug}/`;
}
export const releaseTitle = (release) =>
  release.product
    ? `${releaseProducts[release.product]} ${release.product === "app" ? release.slug : release.tag}`
    : `${release.repo} ${release.tag}`;
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
