import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import jobHistory from "./data/job-history.json";
import projects from "./data/projects.json";
import skillGroups from "./data/skills.json";

/* ── ASCII art ────────────────────────────────────────────────────────────── */
const asciiTitleLarge = `$$\\   $$\\ $$\\                                    $$$$$$$\\                               $$\\       $$\\       
$$$\\  $$ |\\__|                                   $$  __$$\\                              $$ |      $$ |      
$$$$\\ $$ |$$\\  $$$$$$\\  $$$$$$\\ $$\\    $$\\       $$ |  $$ |$$$$$$\\   $$$$$$\\   $$$$$$\\  $$ |  $$\\ $$$$$$$\\  
$$ $$\\$$ |$$ |$$  __$$\\ \\____$$\\\\$$\\  $$  |      $$$$$$$  |\\____$$\\ $$  __$$\\ $$  __$$\\ $$ | $$  |$$  __$$\\ 
$$ \\$$$$ |$$ |$$ |  \\__|$$$$$$$ |\\$$\\$$  /       $$  ____/ $$$$$$$ |$$ |  \\__|$$$$$$$$ |$$$$$$  / $$ |  $$ |
$$ |\\$$$ |$$ |$$ |     $$  __$$ | \\$$$  /        $$ |     $$  __$$ |$$ |      $$   ____|$$  _$$<  $$ |  $$ |
$$ | \\$$ |$$ |$$ |     \\$$$$$$$ |  \\$  /         $$ |     \\$$$$$$$ |$$ |      \\$$$$$$$\\ $$ | \\$$\\ $$ |  $$ |
\\__|  \\__|\\__|\\__|      \\_______|   \\_/          \\__|      \\_______|\\__|       \\_______|\\__|  \\__|\\__|  \\__|`;

const asciiTitleSmall = ` _   _ _                         
| \\ | (_)_ __ __ ___   __        
|  \\| | | '__/ _  \\ \\ / /        
| |\\  | | | | (_| |\\ V /         
|_| \\_|_|_|  \\__,_| \\_/  PAREKH  `;

/* ── Content ──────────────────────────────────────────────────────────────── */
const displayName = "Nirav Parekh";
const displayFirstName = "Nirav";
const displayLastName = "Parekh";

const introLines = [
  "Backend-focused Full Stack Engineer specialising in enterprise applications, secure APIs, and systems built for the long run. I care about what happens when software meets reality - how the system holds under real traffic, how the codebase survives changing requirements, how the next engineer reads what I built.",
  "System design is where I think best. Hard problems are what keep me engaged. End-to-end ownership is just how I work.",
];

const techStackGroups = [
  {
    label: "Backend, data & security",
    logos: [
      { name: "Java", src: "/assets/images/tech-stack/java.png" },
      { name: "Spring Boot", src: "/assets/images/tech-stack/spring_boot.png" },
      { name: "Spring Security", src: "/assets/images/tech-stack/spring.png" },
      { name: "Spring AI", src: "/assets/images/tech-stack/ai_llm.png" },
      { name: "Hibernate", src: "/assets/images/tech-stack/hibernate.png" },
      { name: "JUnit", src: "/assets/images/tech-stack/junit.png" },
      { name: "Mockito", src: "/assets/images/tech-stack/mockito.png" },
      { name: "OAuth2 / OIDC", src: "/assets/images/tech-stack/auth0.png" },
      {
        name: "Security (JWT, RBAC, mTLS)",
        src: "/assets/images/tech-stack/vault.png",
      },
      { name: "MySQL", src: "/assets/images/tech-stack/mysql.png" },
      { name: "PostgreSQL", src: "/assets/images/tech-stack/postgresql.png" },
      { name: "MongoDB", src: "/assets/images/tech-stack/mongodb.png" },
      { name: "Kafka", src: "/assets/images/tech-stack/kafka.png" },
    ],
  },
  {
    label: "Platform, delivery & product",
    logos: [
      { name: "REST API Design", src: "/assets/images/tech-stack/rest.png" },
      { name: "Maven", src: "/assets/images/tech-stack/maven.png" },
      { name: "Docker", src: "/assets/images/tech-stack/docker.png" },
      { name: "CI/CD", src: "/assets/images/tech-stack/ci_cd.png" },
      { name: "GitHub Actions", src: "/assets/images/tech-stack/github.png" },
      { name: "Git", src: "/assets/images/tech-stack/git.png" },
      {
        name: "AI/LLM Integration",
        src: "/assets/images/tech-stack/ai_llm.png",
      },
      { name: "JavaScript", src: "/assets/images/tech-stack/javascript.png" },
      { name: "TypeScript", src: "/assets/images/tech-stack/typescript.png" },
      { name: "React", src: "/assets/images/tech-stack/react.png" },
      { name: "Next.js", src: "/assets/images/tech-stack/next_js.png" },
      {
        name: "Tailwind CSS",
        src: "/assets/images/tech-stack/tailwind_css.png",
      },
      { name: "Redux", src: "/assets/images/tech-stack/redux.png" },
    ],
  },
];

const socialLinks = {
  github: "https://github.com/niruparekh09",
  leetcode: "https://leetcode.com/u/niruparekh09/",
  linkedin: "https://www.linkedin.com/in/niravparekh090",
};

const contactInfo = {
  phoneDisplay: "+91-7746000398",
  phoneHref: "tel:+917746000398",
  email: "niruparekh09@gmail.com",
  resumeHref: "/Nirav_Parekh_Resume.pdf",
};

/* Indexed link list - no icons needed, just label + domain */
const profileLinks = [
  {
    id: "linkedin",
    label: "LinkedIn",
    domain: "linkedin.com/in/niravparekh090",
    href: socialLinks.linkedin,
    openInNewTab: true,
  },
  {
    id: "github",
    label: "GitHub",
    domain: "github.com/niruparekh09",
    href: socialLinks.github,
    openInNewTab: true,
  },
  {
    id: "leetcode",
    label: "LeetCode",
    domain: "leetcode.com/u/niruparekh09",
    href: socialLinks.leetcode,
    openInNewTab: true,
  },
  {
    id: "email",
    label: "Email",
    domain: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    id: "resume",
    label: "Resume",
    domain: "PDF · Nirav_Parekh_Resume.pdf",
    href: contactInfo.resumeHref,
    openInNewTab: true,
  },
];

/* ── Constants ────────────────────────────────────────────────────────────── */
const THEME_STORAGE_KEY = "nrv-portfolio-theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

const IST_FORMATTER = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

const DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

function getInitialTheme() {
  if (typeof window === "undefined") return DARK_THEME;
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === DARK_THEME || saved === LIGHT_THEME) return saved;
  } catch {
    /* ignore */
  }
  return DARK_THEME;
}

/* ── IST Clock ────────────────────────────────────────────────────────────── */
function IstClock() {
  const [t, setT] = useState(() => IST_FORMATTER.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setT(IST_FORMATTER.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="topbar-clock">{t} IST</span>;
}

/* ── Mobile Bottom Nav ────────────────────────────────────────────────────── */
function MobileBottomNav({ activeSection, theme, onToggleTheme }) {
  const isLight = theme === "light";
  const navItems = [
    { href: "#tech-stack", id: "tech-stack", label: "Stack" },
    { href: "#job-history-section", id: "job-history-section", label: "Exp" },
    { href: "#projects", id: "projects", label: "Work" },
    { href: "#skills", id: "skills", label: "Skills" },
    { href: "#links", id: "links", label: "Links" },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Page sections">
      {navItems.map(({ href, id, label }) => (
        <a
          key={id}
          href={href}
          className={`mobile-bottom-nav__link${activeSection === id ? " is-active" : ""}`}
          aria-current={activeSection === id ? "location" : undefined}
        >
          {label}
        </a>
      ))}
      <button
        type="button"
        className="mobile-bottom-nav__theme"
        onClick={onToggleTheme}
        aria-label={isLight ? "Switch to dark" : "Switch to light"}
        title={isLight ? "Switch to dark" : "Switch to light"}
      >
        {isLight ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7.3 7.3 0 0 0 9.8 9.8Z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.8v2.3M12 18.9v2.3M21.2 12h-2.3M5.1 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5" />
          </svg>
        )}
      </button>
    </nav>
  );
}

/* ── App ──────────────────────────────────────────────────────────────────── */
function App() {
  const typedNameRef = useRef(null);
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  /* Apply + persist theme */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  /* Typed.js */
  useEffect(() => {
    if (!typedNameRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typedNameRef.current.textContent = displayName;
      return;
    }
    const typed = new Typed(typedNameRef.current, {
      strings: [
        "Nirav Parekh",
        "Backend Engineer",
        "Enterprise Application Developer",
        "System Design Enthusiast",
        "Problem Solver",
      ],
      typeSpeed: 44,
      backSpeed: 28,
      backDelay: 1300,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: "_",
    });
    return () => typed.destroy();
  }, []);

  /* Active section for topbar nav */
  useEffect(() => {
    const ids = [
      "tech-stack",
      "job-history-section",
      "projects",
      "skills",
      "links",
    ];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const update = () => {
      const line = window.scrollY + window.innerHeight * 0.3;
      let next = "";
      sections.forEach((s) => {
        if (s.offsetTop <= line) next = s.id;
      });
      setActiveSection(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /* Topbar border on scroll */
  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const isLight = theme === LIGHT_THEME;
  const themeLabel = isLight ? "Switch to dark" : "Switch to light";
  const todayStr = DATE_FORMATTER.format(new Date());
  const sectionIsActive = (id) => activeSection === id;

  return (
    <>
      {/* ── Skip link ─────────────────────────────────────────────────────── */}
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* ── Top bar (opaque, no blur) ──────────────────────────────────────── */}
      <header
        className={`site-topbar${isScrolled ? " is-scrolled" : ""}`}
        role="banner"
      >
        <div className="topbar-left">
          <a
            className="topbar-wordmark"
            href="#top"
            aria-label="Nirav Parekh - back to top"
          >
            NRV
          </a>
          <IstClock />
        </div>

        <nav className="topbar-nav" aria-label="Page sections">
          {[
            { href: "#tech-stack", id: "tech-stack", label: "Stack" },
            {
              href: "#job-history-section",
              id: "job-history-section",
              label: "Exp",
            },
            { href: "#projects", id: "projects", label: "Work" },
            { href: "#skills", id: "skills", label: "Skills" },
            { href: "#links", id: "links", label: "Links" },
          ].map(({ href, id, label }) => (
            <a
              key={id}
              href={href}
              className={sectionIsActive(id) ? "is-active" : ""}
              aria-current={sectionIsActive(id) ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="topbar-right">
          <button
            type="button"
            className="theme-toggle"
            onClick={() =>
              setTheme((t) => (t === DARK_THEME ? LIGHT_THEME : DARK_THEME))
            }
            aria-label={themeLabel}
            title={themeLabel}
          >
            <span className="theme-toggle__icon" aria-hidden="true">
              {isLight ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7.3 7.3 0 0 0 9.8 9.8Z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="4.2" />
                  <path d="M12 2.8v2.3M12 18.9v2.3M21.2 12h-2.3M5.1 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </header>

      {/* ── Main ──────────────────────────────────────────────────────────── */}
      <main id="main-content" className="portfolio-main">
        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section id="top" className="header section-panel hero-panel">
          <h1 className="sr-only">{displayName} - Backend Engineer</h1>

          {/* Dateline - the editorial unexpected element */}
          {/* Reads like a newspaper dateline: location · status · date */}
          <ul className="hero-dateline" aria-label="Location and availability">
            <li>India</li>
            <li className="dateline-avail">Open to work</li>
            <li>{todayStr}</li>
          </ul>

          {/* Typed name line (desktop) */}
          <p className="name-typed-line" aria-hidden="true">
            <span className="name-typed-prefix">→</span>
            <span ref={typedNameRef} />
          </p>

          {/* Mobile nameplate - typographic, split first/last */}
          <p className="mobile-nameplate" aria-hidden="true">
            {displayFirstName}
            <span>{displayLastName}</span>
          </p>

          {/* ASCII title */}
          <div className="ascii-title">
            <pre className="ascii-art large" aria-hidden="true">
              {asciiTitleLarge}
            </pre>
            <pre className="ascii-art small" aria-hidden="true">
              {asciiTitleSmall}
            </pre>
          </div>

          {/* Intro */}
          <div className="intro-copy">
            {introLines.map((line) => (
              <p key={line.slice(0, 24)}>{line}</p>
            ))}
          </div>

          {/* Keyword strip */}
          <ul className="backend-signals" aria-label="Engineering focus areas">
            <li>Java</li>
            <li>Spring Boot</li>
            <li>Go</li>
            <li>Distributed systems</li>
            <li>Security-first APIs</li>
            <li>Production ownership</li>
          </ul>
        </section>

        {/* ── Tech Stack ──────────────────────────────────────────────────── */}
        <section id="tech-stack" className="section-panel tech-stack-panel">
          <h2 data-label="Stack">Tech Stack</h2>
          <div className="tech-stack-toolbar">
            <p>
              Tools I use across backend systems, platform engineering, and
              product delivery.
            </p>
          </div>
          <div className="tech-groups">
            {techStackGroups.map((group, gi) => (
              <article className="tech-group" key={group.label}>
                <header className="tech-group__header">
                  <p className="tech-group__label">
                    <span>{String(gi + 1).padStart(2, "0")}</span>
                    {group.label}
                  </p>
                  <span className="tech-group__count">
                    {group.logos.length} tools
                  </span>
                </header>
                <div
                  className={`tech-carousel${gi % 2 === 1 ? " tech-carousel--reverse" : ""}`}
                >
                  <ul
                    className="tech-carousel-track"
                    aria-label={`${group.label} technologies`}
                  >
                    {[...group.logos, ...group.logos].map((logo, li) => (
                      <li
                        className="tech-logo-item"
                        key={`${group.label}-${logo.name}-${li}`}
                        title={logo.name}
                        aria-hidden={
                          li >= group.logos.length ? "true" : undefined
                        }
                      >
                        <img
                          src={logo.src}
                          alt={logo.name}
                          className="tech-logo"
                          decoding="async"
                        />
                        <span className="tech-logo-name">{logo.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Experience ──────────────────────────────────────────────────── */}
        <section
          id="job-history-section"
          className="job-history-section section-panel"
          aria-labelledby="exp-heading"
        >
          <h2 id="exp-heading" data-label="Exp">
            Professional Experience
          </h2>
          <div className="job-timeline">
            {jobHistory.map((employer) => (
              <article className="job-employer" key={employer.company}>
                <header className="job-employer__header">
                  <h3 className="job-employer__name">{employer.company}</h3>
                  <p className="job-employer__location">{employer.location}</p>
                </header>
                <div className="job-employer__positions">
                  {employer.positions.map((pos) => (
                    <div
                      className="job-position"
                      key={`${employer.company}-${pos.title}-${pos.yearStart}`}
                    >
                      <div className="job-position__header-row">
                        <h4 className="job-position__title">{pos.title}</h4>
                        <p className="job-position__dates">
                          <span className="subtitle-year">
                            {pos.dateLabel || `${pos.yearStart}–${pos.yearEnd}`}
                          </span>
                        </p>
                      </div>
                      <ul className="job-position__highlights">
                        {pos.highlights.map((h) => (
                          <li key={h.slice(0, 36)}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Projects ────────────────────────────────────────────────────── */}
        <section id="projects" className="section-panel projects-section">
          <h2 data-label="Work">Projects</h2>
          <p className="meta-copy">Selected public work from GitHub.</p>
          <div className="projects-timeline">
            {projects.map((project, pi) => (
              <article className="project-item" key={project.name}>
                <header className="project-item__header">
                  <span className="project-item__index" aria-hidden="true">
                    {String(pi + 1).padStart(2, "0")}
                  </span>
                  <h3 className="project-item__title">
                    <a href={project.href} target="_blank" rel="noreferrer">
                      {project.name}
                    </a>
                  </h3>
                  <span className="subtitle-year">{project.year}</span>
                </header>
                <p className="project-description">{project.description}</p>
                <ul className="project-highlights">
                  {project.highlights.map((h) => (
                    <li key={h.slice(0, 32)}>{h}</li>
                  ))}
                </ul>
                <div
                  className="project-tags"
                  aria-label={`${project.name} tags`}
                >
                  {project.tags.map((tag) => (
                    <span
                      className={`tag ${tag}`}
                      key={`${project.name}-${tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Skills ──────────────────────────────────────────────────────── */}
        <section id="skills" className="section-panel">
          <h2 data-label="Skills">Technical Skills</h2>
          <div
            className="skills-matrix"
            role="list"
            aria-label="Technical skills by category"
          >
            {skillGroups.map((skill) => {
              const items = Array.isArray(skill.skills)
                ? skill.skills
                : String(skill.stack || "")
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
              return (
                <article
                  className="skill-row"
                  role="listitem"
                  key={skill.category}
                >
                  <h3 className="skill-row__category">{skill.category}</h3>
                  <ul className="skill-row__items">
                    {items.map((item) => (
                      <li
                        className="skill-pill"
                        key={`${skill.category}-${item}`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Links ───────────────────────────────────────────────────────── */}
        <section id="links" className="section-panel links-panel">
          <h2 data-label="Links">Links</h2>
          {/* Indexed list - no icon grid */}
          <nav
            className="links-list"
            aria-label="External profiles and contact"
          >
            {profileLinks.map((link, i) => (
              <a
                key={link.id}
                className="link-entry"
                href={link.href}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noreferrer" : undefined}
              >
                <span className="link-entry__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="link-entry__label">{link.label}</span>
                <span className="link-entry__domain" aria-hidden="true">
                  {link.domain}
                </span>
              </a>
            ))}
          </nav>

          {/* Contact bar - replaces floating actions */}
          <div className="contact-bar" aria-label="Direct contact">
            <span className="contact-bar__label">Contact</span>
            <a href={contactInfo.phoneHref}>{contactInfo.phoneDisplay}</a>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            <a href={contactInfo.resumeHref} target="_blank" rel="noreferrer">
              Resume PDF
            </a>
          </div>
        </section>
      </main>

      {/* ── Mobile bottom nav ────────────────────────────────────────────── */}
      <MobileBottomNav
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={() =>
          setTheme((t) => (t === DARK_THEME ? LIGHT_THEME : DARK_THEME))
        }
      />

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer>
        <section>
          <p>© {new Date().getFullYear()} Nirav Parekh</p>
          <p>Designed and built by Nirav Parekh</p>
        </section>
      </footer>
    </>
  );
}

export default App;
