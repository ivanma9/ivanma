import { useEffect, useRef, useState } from "react";
import { experience, links } from "./data.js";
import { repoNames, impact, quality } from "./statsData.js";
import stats from "./stats.json";

const nav = [
  ["./#work", "Work"],
  ["./#experience", "Experience"],
  ["./#about", "About"],
  ["./#contact", "Contact"],
];
const tabs = [
  ["commits", "Commits"],
  ["languages", "Languages"],
  ["years", "Repos per year"],
];

const Ext = ({ href, children }) => (
  <a className="link" href={href} target="_blank" rel="noreferrer">{children}</a>
);

const nf = new Intl.NumberFormat("en-US");
const display = (r) => repoNames[r.name] ?? r.name;
const years = [...new Set(stats.repos.map((r) => r.year))].sort((a, b) => b - a);
const asOf = new Date(stats.generatedAt).toLocaleDateString("en-US", {
  month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
});

// "#commits/2026" -> { cat: "commits", year: "2026" }; anything unknown falls back to defaults
function readHash() {
  const [c, y] = window.location.hash.slice(1).split("/");
  return {
    cat: tabs.some(([id]) => id === c) ? c : "commits",
    year: years.includes(Number(y)) ? y : "all",
  };
}

// Competition ranking: ties share a rank and the next is skipped (1, 2, 3, 3, 5)
const rank = (rows) => rows.map((r, i) => ({ ...r, rank: i && r.val === rows[i - 1].val ? rows[i - 1].rank : i + 1 }));

function buildBoard(cat, year) {
  const { repos, languages } = stats;
  if (cat === "commits") {
    const rows = repos
      .filter((r) => r.commits > 0 && (year === "all" || r.year === Number(year)))
      .slice(0, 10)
      .map((r) => ({
        key: r.name, url: r.url, who: display(r), val: r.commits, text: nf.format(r.commits),
        sub: `${r.language ?? "No language"} · ${r.year}` + (r.contributors > 1 ? ` · team repo, ${r.contributors} contributors` : ""),
      }));
    return {
      rows, col: ["Repo", "Commits"],
      caption: `Top repos by my commits, started ${year === "all" ? "in any year" : `in ${year}`}`,
      note: "Commits I authored on each repo's default branch.",
    };
  }
  if (cat === "languages") {
    const total = Object.values(languages).reduce((a, b) => a + b, 0);
    const rows = Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([l, bytes]) => {
      const n = repos.filter((r) => r.language === l).length;
      const pct = (bytes / total) * 100;
      return { key: l, who: l, val: Number(pct.toFixed(1)), text: `${pct.toFixed(1)}%`, sub: `main language of ${n} ${n === 1 ? "repo" : "repos"}` };
    });
    return {
      rows, col: ["Language", "Share of code"], caption: "Top languages by share of code size",
      note: "Share of code by size across my public repos, as GitHub measures it. Repos that bundle other projects' code count it too.",
    };
  }
  const rows = years.map((y) => {
    const inYear = repos.filter((r) => r.year === y); // repos are already sorted by commits
    return { key: y, who: String(y), val: inYear.length, text: String(inYear.length), sub: inYear.slice(0, 3).map(display).join(", ") };
  });
  return {
    rows, col: ["Year", "Repos"], caption: "Public repos by the year they were created",
    note: "Public repos by the year they were created.",
  };
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const Tiles = ({ items, className = "" }) => (
  <ul className={`stat-tiles ${className}`.trim()}>
    {items.map(([num, label]) => (
      <li key={label} className="stat-tile" data-reveal>
        <strong className="stat-num">{num}</strong>
        <span className="stat-label">{label}</span>
      </li>
    ))}
  </ul>
);

function Leaderboard() {
  const [{ cat, year }, setState] = useState(readHash);
  const tabRefs = useRef([]);

  useEffect(() => {
    const h = `#${cat}${cat === "commits" && year !== "all" ? `/${year}` : ""}`;
    if (window.location.hash !== h) history.replaceState(null, "", h);
  }, [cat, year]);
  useEffect(() => {
    const onHash = () => {
      if (tabs.some(([id]) => id === window.location.hash.slice(1).split("/")[0])) setState(readHash());
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const onKey = (e, i) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const j = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (i + d + tabs.length) % tabs.length;
    setState((s) => ({ ...s, cat: tabs[j][0] }));
    tabRefs.current[j]?.focus();
  };

  const board = buildBoard(cat, year);
  const rows = rank(board.rows);
  const top = rows[0]?.val || 1;

  return (
    <section className="section leaders" id="leaders" aria-labelledby="leaders-h">
      <h2 id="leaders-h" data-reveal>Leaderboards</h2>
      <div className="board-controls">
        <div className="board-tabs" role="tablist" aria-label="Leaderboard">
          {tabs.map(([id, label], i) => (
            <button
              key={id} ref={(el) => (tabRefs.current[i] = el)} type="button" role="tab" className="board-tab"
              id={`tab-${id}`} aria-selected={cat === id} aria-controls="board-panel"
              tabIndex={cat === id ? 0 : -1}
              onClick={() => setState((s) => ({ ...s, cat: id }))} onKeyDown={(e) => onKey(e, i)}
            >
              {label}
            </button>
          ))}
        </div>
        {cat === "commits" && (
          <label className="board-filter">
            Started in{" "}
            <select value={year} onChange={(e) => setState((s) => ({ ...s, year: e.target.value }))}>
              <option value="all">All time</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </label>
        )}
      </div>
      <div id="board-panel" role="tabpanel" tabIndex={0} aria-labelledby={`tab-${cat}`}>
        <div className="board-card">
        <table className="board">
          <caption className="sr-only">{board.caption}</caption>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">{board.col[0]}</th>
              <th scope="col">{board.col[1]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.key} className={i === 0 ? "leader" : undefined}>
                <td className="rank"><span className="badge">{r.rank}</span></td>
                <th scope="row" className="who">
                  {r.url ? <a href={r.url}>{r.who}</a> : r.who}
                  <span className="sub">{r.sub}</span>
                </th>
                <td className="val">
                  {r.text}
                  <span className="bar" aria-hidden="true" style={{ "--w": `${(r.val / top) * 100}%` }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <p className="board-note">{board.note}</p>
      </div>
    </section>
  );
}

export default function StatsPage() {
  useReveal();
  const commits = stats.repos.reduce((s, r) => s + r.commits, 0);
  const latest = Math.max(...stats.repos.map((r) => r.year));

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="bar">
        <div className="bar-in">
          <a className="name" href="./">Ivan Ma</a>
          <nav aria-label="Sections">
            {nav.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
            <a href="./stats.html" aria-current="page">Stats</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="stats-hero">
          <h1 data-reveal>Stats</h1>
          <p className="stats-asof">
            Public GitHub repos as of {asOf}. Career numbers are from my resume; project numbers are from each repo's README or GitHub.
          </p>
          <Tiles items={[
            [nf.format(commits), "commits"],
            [nf.format(stats.repos.length), "original public repos"],
            [nf.format(stats.repos.filter((r) => r.year === latest).length), `repos started in ${latest}`],
            [nf.format(experience.length), "roles"],
          ]} />
        </section>

        <Leaderboard />

        <section className="section impact" aria-labelledby="impact-h">
          <h2 id="impact-h" data-reveal>Career impact</h2>
          <div className="impact-grid">
          {impact.map((g) => (
            <article key={g.org} className="impact-group" data-reveal>
              <h3>{g.org}</h3>
              <p className="impact-role">{g.role}, {g.when}</p>
              <Tiles items={g.stats} />
            </article>
          ))}
          </div>
        </section>

        <section className="section quality" aria-labelledby="quality-h">
          <h2 id="quality-h" data-reveal>Project quality</h2>
          <ul className="stat-tiles quality-tiles">
            {quality.map((q) => (
              <li key={q.label} className="stat-tile" data-reveal>
                <strong className="stat-num">{q.num}</strong>
                <span className="stat-label">{q.label}</span>
                <a className="link" href={q.href} target="_blank" rel="noreferrer">{q.project}</a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="foot">
        <span>© {new Date().getFullYear()} Ivan Ma</span>
        <span className="foot-links">
          <Ext href={links.github}>GitHub</Ext>
          <Ext href={links.linkedin}>LinkedIn</Ext>
        </span>
      </footer>
    </>
  );
}
