import snapshot from "../data/releases.json";
import { sortReleases } from "./releases.mjs";

if (snapshot.schemaVersion !== 1)
  throw new Error("Unsupported release snapshot");
export const releases = sortReleases(snapshot.releases);
export const repositories = snapshot.repositories.filter((repo) =>
  releases.some((release) => release.repo === repo.slug),
);
