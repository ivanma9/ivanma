// Snapshot public GitHub stats into src/stats.json. Needs the `gh` CLI, logged in.
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const USER = "ivanma9";
const gh = (...args) =>
  execFileSync("gh", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

try {
  gh("auth", "status");
} catch (e) {
  console.error(
    e.code === "ENOENT"
      ? "stats: the `gh` CLI is not installed. Install it from https://cli.github.com and run `gh auth login`."
      : "stats: `gh` is not authenticated. Run `gh auth login` and try again."
  );
  process.exit(1);
}

// `--paginate` prints one JSON array per page, back to back; empty repos print nothing
const parseArrays = (out) => {
  const s = out.trim();
  return s ? JSON.parse(`[${s.replace(/\]\s*\[/g, "],[")}]`).flat() : [];
};

const list = JSON.parse(
  gh("repo", "list", USER, "--limit", "200", "--source", "--visibility", "public",
    "--json", "name,description,primaryLanguage,stargazerCount,createdAt,pushedAt,homepageUrl")
);

const languages = {};
const repos = list.map((r) => {
  const contribs = parseArrays(gh("api", `repos/${USER}/${r.name}/contributors?per_page=100`, "--paginate"));
  const langs = JSON.parse(gh("api", `repos/${USER}/${r.name}/languages`) || "{}");
  for (const [l, b] of Object.entries(langs)) languages[l] = (languages[l] ?? 0) + b;
  return {
    name: r.name,
    description: r.description || "",
    language: r.primaryLanguage?.name ?? null,
    year: new Date(r.createdAt).getUTCFullYear(),
    stars: r.stargazerCount,
    commits: contribs.find((c) => c.login === USER)?.contributions ?? 0,
    contributors: contribs.length,
    url: `https://github.com/${USER}/${r.name}`,
  };
});
repos.sort((a, b) => b.commits - a.commits);

const out = { generatedAt: new Date().toISOString(), user: USER, repos, languages };
writeFileSync(fileURLToPath(new URL("../src/stats.json", import.meta.url)), JSON.stringify(out, null, 2) + "\n");
console.log(`stats: ${repos.length} repos, ${repos.reduce((s, r) => s + r.commits, 0)} commits`);
