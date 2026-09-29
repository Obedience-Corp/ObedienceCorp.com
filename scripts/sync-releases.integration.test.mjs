// Run only in a container: these tests mutate the filesystem.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, stat, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { syncReleases } from "./sync-releases.mjs";
import { rawRepo, rawRelease, response } from "./release-fixtures.mjs";
async function fixture(run) {
  const dir = await mkdtemp(join(tmpdir(), "release sync "));
  try {
    await run(join(dir, "snapshot.json"), dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

test("backfills history, discovers new repos, reflects edits and removals, and does not rewrite unchanged data", () =>
  fixture(async (output, dir) => {
    let repos = [rawRepo(), rawRepo({ id: 2, name: "private", private: true })];
    let rows = [
      rawRelease(),
      rawRelease({
        id: 11,
        tag_name: "v0.1",
        published_at: "2020-01-01T00:00:00Z",
        prerelease: true,
      }),
      rawRelease({ id: 12, draft: true }),
    ];
    const fetchImpl = async (url) => {
      if (url.includes("/orgs/")) return response(repos);
      assert(!url.includes("/private/"));
      return response(rows);
    };
    assert.equal((await syncReleases({ output, fetchImpl })).count, 2);
    const before = (await stat(output)).mtimeMs;
    assert.equal((await syncReleases({ output, fetchImpl })).changed, false);
    assert.equal((await stat(output)).mtimeMs, before);
    repos.push(rawRepo({ id: 3, name: "new-repo" }));
    const dynamicFetch = async (url) =>
      url.includes("/new-repo/")
        ? response([rawRelease({ id: 20 })])
        : fetchImpl(url);
    assert.equal(
      (await syncReleases({ output, fetchImpl: dynamicFetch })).count,
      3,
    );
    rows = [rawRelease({ body: "- Edited notes" })];
    repos = [rawRepo()];
    await syncReleases({ output, fetchImpl });
    const saved = JSON.parse(await readFile(output, "utf8"));
    assert.equal(saved.releases.length, 1);
    assert.equal(saved.repositories.length, 1);
    assert.equal(saved.releases[0].body, "- Edited notes");
    assert.deepEqual(await readdir(dir), ["snapshot.json"]);
  }));

test("a failed later repository or duplicate release path preserves the previous snapshot", () =>
  fixture(async (output, dir) => {
    const fetchImpl = async (url) =>
      response(url.includes("/orgs/") ? [rawRepo()] : [rawRelease()]);
    await syncReleases({ output, fetchImpl });
    const before = await readFile(output, "utf8");
    await assert.rejects(
      syncReleases({
        output,
        fetchImpl: async (url) =>
          url.includes("/orgs/")
            ? response([rawRepo(), rawRepo({ id: 2, name: "z-fails" })])
            : url.includes("/z-fails/")
              ? new Response("", { status: 403 })
              : response([rawRelease({ body: "new content" })]),
      }),
      /HTTP 403/,
    );
    assert.equal(await readFile(output, "utf8"), before);
    await assert.rejects(
      syncReleases({
        output,
        fetchImpl: async (url) =>
          response(
            url.includes("/orgs/")
              ? [rawRepo()]
              : [rawRelease(), rawRelease({ id: 11 })],
          ),
      }),
      /Duplicate release path/,
    );
    assert.equal(await readFile(output, "utf8"), before);
    assert.deepEqual(await readdir(dir), ["snapshot.json"]);
  }));
