import { useEffect, useState } from "react";
import { projects, more, earlier, experience, education, skills, links } from "./data.js";
import portrait from "./assets/portrait.jpg";

const sections = [
  ["work", "Work"],
  ["experience", "Experience"],
  ["about", "About"],
  ["contact", "Contact"],
];

// A highlighted phrase in the hero; its tag names the project it links to.
const Mark = ({ to, tag, i, children }) => (
  <a className="mark" href={`#${to}`} style={{ "--i": i }} aria-describedby={`tag-${to}`}>
    <span className="mark-tag" id={`tag-${to}`} aria-hidden="true">{tag}</span>
    {children}
  </a>
);

const Ext = ({ href, children }) => (
  <a className="link" href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

// One timeline row; roles with `points` expand to show them.
const Role = ({ x, i, open, onToggle }) => (
  <li data-reveal className={open ? "open" : undefined}>
    <span className="when">
      {x.when}
      <span className="place">{x.place}</span>
    </span>
    <div>
      <h3>{x.role}, {x.org}</h3>
      <p>{x.note}</p>
      {x.points && (
        <>
          <button
            className="role-toggle"
            aria-expanded={open}
            aria-controls={`role-${i}`}
            aria-label={`${open ? "Hide" : "Show"} details for ${x.org}`}
            onClick={onToggle}
          >
            {open ? "Hide details" : "Show details"}
          </button>
          <div className="points" id={`role-${i}`}>
            <ul>
              {x.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
          </div>
        </>
      )}
    </div>
  </li>
);

// "AWS (Lambda, S3)" stays one term: split on commas that aren't inside parentheses
const terms = (s) => s.split(/,\s*(?![^()]*\))/);

// Soft spotlight that follows the pointer across a project row
const spotlight = (e) => {
  const row = e.target.closest(".project");
  if (!row) return;
  const r = row.getBoundingClientRect();
  row.style.setProperty("--mx", `${e.clientX - r.left}px`);
  row.style.setProperty("--my", `${e.clientY - r.top}px`);
};

function useScrollEffects(setActive) {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

    // the section crossing the middle of the viewport is the current one
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id || null);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main > section").forEach((s) => spy.observe(s));

    return () => {
      reveal.disconnect();
      spy.disconnect();
    };
  }, [setActive]);
}

export default function App() {
  const [active, setActive] = useState(null);
  const [openRoles, setOpenRoles] = useState(() => new Set([0, 1])); // most recent two start open
  const toggleRole = (i) =>
    setOpenRoles((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  useScrollEffects(setActive);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="bar">
        <div className="bar-in">
          <a className="name" href="#top">Ivan Ma</a>
          <nav aria-label="Sections">
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <h1>
            I build AI tools that read{" "}
            <Mark to="freight" tag="Freight portal" i={0}>freight invoices</Mark>,{" "}
            <Mark to="labels" tag="Label verifier" i={1}>liquor labels</Mark> and{" "}
            <Mark to="legacylens" tag="LegacyLens" i={2}>a&nbsp;million lines of FORTRAN</Mark>,
            then show you where every answer came from.
          </h1>
          <p className="lede">
            AI engineer in Irvine, California. Gauntlet AI fellow in 2026, previously a software
            engineer at Intelizen, founder of Step AI, and an intern at Amazon and Roku.
          </p>
          <p className="actions">
            <a className="button" href={`mailto:${links.email}`}>Email me</a>
            <Ext href={links.github}>GitHub</Ext>
            <Ext href={links.linkedin}>LinkedIn</Ext>
          </p>
        </section>

        <section id="work" className="section" aria-labelledby="work-h">
          <h2 id="work-h" data-reveal>Selected work</h2>
          <ul className="projects" onPointerMove={spotlight}>
            {projects.map((p) => (
              <li key={p.id} id={p.id} className="project" data-reveal>
                <div className="project-head">
                  <h3><span className="hl">{p.name}</span></h3>
                  <p className="tagline">{p.tagline}</p>
                </div>
                <div className="project-body">
                  <p>{p.body}</p>
                  <p className="stack">{p.stack}</p>
                  {(p.live || p.code || p.extra) && (
                    <p className="project-links">
                      {p.live && <Ext href={p.live}>Open live demo</Ext>}
                      {p.code && <Ext href={p.code}>Read the code</Ext>}
                      {p.extra && <Ext href={p.extra.href}>{p.extra.label}</Ext>}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <h2 className="sub" data-reveal>More projects</h2>
          <ul className="more-list">
            {more.map((p) => (
              <li key={p.name} data-reveal>
                <h3><span className="hl">{p.name}</span></h3>
                <div>
                  <p>{p.body}</p>
                  <p className="stack">{p.stack}</p>
                </div>
                <p className="project-links">
                  {p.links.map((l) => <Ext key={l.href} href={l.href}>{l.label}</Ext>)}
                </p>
              </li>
            ))}
          </ul>

          <h2 className="sub" data-reveal>Earlier, at UCLA</h2>
          <div className="earlier">
            {earlier.map((p, i) => (
              <figure key={p.name} data-reveal style={{ "--d": i }}>
                <div className="shot">
                  <img src={p.image} alt={p.alt} loading="lazy" />
                </div>
                <figcaption>
                  <h3><span className="hl">{p.name}</span></h3>
                  <p>{p.body}</p>
                  <p className="stack">{p.stack}</p>
                  {p.code && <Ext href={p.code}>Read the code</Ext>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="experience" className="section" aria-labelledby="exp-h">
          <h2 id="exp-h" data-reveal>Experience</h2>
          <ol className="timeline">
            {experience.map((x, i) => (
              <Role key={x.org + x.when} x={x} i={i} open={openRoles.has(i)} onToggle={() => toggleRole(i)} />
            ))}
            <Role x={education} i={experience.length} />
          </ol>
        </section>

        <section id="about" className="section about" aria-labelledby="about-h">
          <img
            className="portrait"
            src={portrait}
            alt="Ivan at his UCLA graduation, smiling in a blue and gold stole."
            loading="lazy"
            data-reveal
          />
          <div>
            <h2 id="about-h" data-reveal>About</h2>
            <p className="prose">
              I like the part of AI work where the output has to hold up: an ops team
              checking freight paperwork, an engineer about to change decades-old
              FORTRAN, a ten-year-old learning what a multiple is. So I build things that
              show their sources and get tested against eval sets before anyone relies on
              them.
            </p>
            <p className="prose">
              I speak English, Spanish, Mandarin and Japanese, and I spent two years
              teaching robotics to kids.
            </p>
            <dl className="skills">
              {skills.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>
                    {terms(v).map((t, i) => (
                      <span key={t}>
                        {i > 0 && ", "}
                        <span className="term">{t}</span>
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="contact" className="section contact" aria-labelledby="contact-h">
          <h2 id="contact-h" data-reveal>My inbox is open. Write if you want to work together, or just to say hi.</h2>
          <a className="email" href={`mailto:${links.email}`} data-reveal>{links.email}</a>
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
