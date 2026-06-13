import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import jobHistory from "./data/job-history.json";
import projects from "./data/projects.json";
import skillGroups from "./data/skills.json";

const asciiTitleLarge = `$$\\   $$\\ $$\\                                    $$$$$$$\\                               $$\\       $$\\       
$$$\\  $$ |\\__|                                   $$  __$$\\                              $$ |      $$ |      
$$$$\\ $$ |$$\\  $$$$$$\\  $$$$$$\\ $$\\    $$\\       $$ |  $$ |$$$$$$\\   $$$$$$\\   $$$$$$\\  $$ |  $$\\ $$$$$$$\\  
$$ $$\\$$ |$$ |$$  __$$\\ \\____$$\\\\$$\\  $$  |      $$$$$$$  |\\____$$\\ $$  __$$\\ $$  __$$\\ $$ | $$  |$$  __$$\\ 
$$ \\$$$$ |$$ |$$ |  \\__|$$$$$$$ |\\$$\\$$  /       $$  ____/ $$$$$$$ |$$ |  \\__|$$$$$$$$ |$$$$$$  / $$ |  $$ |
$$ |\\$$$ |$$ |$$ |     $$  __$$ | \\$$$  /        $$ |     $$  __$$ |$$ |      $$   ____|$$  _$$<  $$ |  $$ |
$$ | \\$$ |$$ |$$ |     \\$$$$$$$ |  \\$  /         $$ |     \\$$$$$$$ |$$ |      \\$$$$$$$\\ $$ | \\$$\\ $$ |  $$ |
\\__|  \\__|\\__|\\__|      \\_______|   \\_/          \\__|      \\_______|\\__|       \\_______|\\__|  \\__|\\__|  \\__|
                                                                                                            
                                                                                                            
                                                                                                            `;

const asciiTitleSmall = ` _   _ _                         
| \\ | (_)_ __ __ ___   __        
|  \\| | | '__/ _  \\ \\ / /        
| |\\  | | | | (_| |\\ V /         
|_| \\_|_|_|  \\__,_| \\_/  PAREKH  `;

const displayName = "Nirav Parekh";

const introLines = [
  "Full Stack Engineer specializing in enterprise applications, secure APIs, and systems built for the long run. I care about what happens in real applications - how the system handles real traffic, how the codebase survives changing requirements, how the next engineer can actually understand what I built.",
  "System design is where I think best. Hard problems are what keep me engaged. Continuous learning is how I stay sharp. End-to-end ownership is just how I work."
];

const techLogos = [
  { name: "Java", src: "/assets/images/tech-stack/java.png" },
  { name: "JavaScript", src: "/assets/images/tech-stack/javascript.png" },
  { name: "TypeScript", src: "/assets/images/tech-stack/typescript.png" },
  { name: "Spring Boot", src: "/assets/images/tech-stack/spring_boot.png" },
  { name: "Spring Security", src: "/assets/images/tech-stack/spring.png" },
  { name: "Spring AI", src: "/assets/images/tech-stack/ai_llm.png" },
  { name: "Hibernate", src: "/assets/images/tech-stack/hibernate.png" },
  { name: "React", src: "/assets/images/tech-stack/react.png" },
  { name: "Next.js", src: "/assets/images/tech-stack/next_js.png" },
  { name: "Tailwind CSS", src: "/assets/images/tech-stack/tailwind_css.png" },
  { name: "Redux", src: "/assets/images/tech-stack/redux.png" },
  { name: "JUnit", src: "/assets/images/tech-stack/junit.png" },
  { name: "Mockito", src: "/assets/images/tech-stack/mockito.png" },
  { name: "OAuth2 / OIDC", src: "/assets/images/tech-stack/auth0.png" },
  { name: "Security (JWT, RBAC, mTLS)", src: "/assets/images/tech-stack/vault.png" },
  { name: "MySQL", src: "/assets/images/tech-stack/mysql.png" },
  { name: "PostgreSQL", src: "/assets/images/tech-stack/postgresql.png" },
  { name: "MongoDB", src: "/assets/images/tech-stack/mongodb.png" },
  { name: "Git", src: "/assets/images/tech-stack/git.png" },
  { name: "Maven", src: "/assets/images/tech-stack/maven.png" },
  { name: "Docker", src: "/assets/images/tech-stack/docker.png" },
  { name: "Kafka", src: "/assets/images/tech-stack/kafka.png" },
  { name: "CI/CD", src: "/assets/images/tech-stack/ci_cd.png" },
  { name: "GitHub Actions", src: "/assets/images/tech-stack/github.png" },
  { name: "REST API Design", src: "/assets/images/tech-stack/rest.png" },
  { name: "AI/LLM Integration", src: "/assets/images/tech-stack/ai_llm.png" }
];

const socialLinks = {
  github: "https://github.com/niruparekh09",
  leetcode: "https://leetcode.com/u/niruparekh09/",
  linkedin: "https://www.linkedin.com/in/niravparekh090"
};

const contactInfo = {
  phoneDisplay: "+91-7746000398",
  phoneHref: "tel:+917746000398",
  email: "niruparekh09@gmail.com",
  resumeHref: "/Nirav_Parekh_Resume.pdf"
};

const profileLinks = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: socialLinks.linkedin,
    icon: "/assets/images/icons/linkedin.svg",
    openInNewTab: true
  },
  {
    id: "github",
    label: "GitHub",
    href: socialLinks.github,
    icon: "/assets/images/icons/github.svg",
    openInNewTab: true
  },
  {
    id: "leetcode",
    label: "LeetCode",
    href: socialLinks.leetcode,
    icon: "/assets/images/icons/leetcode.svg",
    openInNewTab: true
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${contactInfo.email}`,
    icon: "/assets/images/icons/email.svg"
  },
  {
    id: "resume",
    label: "Resume (PDF)",
    href: contactInfo.resumeHref,
    icon: "/assets/images/icons/resume.svg",
    openInNewTab: true
  },
  {
    id: "home",
    label: "Home",
    href: "/index.html",
    icon: "/assets/images/icons/home.svg"
  }
];

const THEME_STORAGE_KEY = "nrv-portfolio-theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";
const IST_CLOCK_FORMATTER = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata"
});

function getInitialTheme() {
  if (typeof window === "undefined") {
    return DARK_THEME;
  }

  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === DARK_THEME || savedTheme === LIGHT_THEME) {
      return savedTheme;
    }
  } catch {
    return DARK_THEME;
  }

  return DARK_THEME;
}

function getIstClockText() {
  return `${IST_CLOCK_FORMATTER.format(new Date())} IST`;
}

function App() {
  const typedNameRef = useRef(null);
  const [theme, setTheme] = useState(getInitialTheme);
  const [clockText, setClockText] = useState(getIstClockText);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors and continue with in-memory theme state.
    }
  }, [theme]);

  useEffect(() => {
    if (!typedNameRef.current) {
      return undefined;
    }

    const typed = new Typed(typedNameRef.current, {
      strings: [
        "Nirav Parekh",
        "Backend Engineer",
        "Enterprise Application Developer",
        "System Design Enthusiast",
        "Problem Solver"
      ],
      typeSpeed: 44,
      backSpeed: 28,
      backDelay: 1300,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: "_"
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setClockText(getIstClockText());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const isLightTheme = theme === LIGHT_THEME;
  const themeToggleLabel = isLightTheme ? "Switch to Dark" : "Switch to Light";

  return (
    <>
      <div className="floating-brand-left" aria-label="Brand and time">
        <div className="nrv-chip">
          <span className="nrv-chip__brand">NRV</span>
          <span className="nrv-chip__clock" aria-live="polite">
            {clockText}
          </span>
        </div>
      </div>

      <div className="floating-top-right" aria-label="Theme controls">
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme((currentTheme) => (currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME))}
          aria-label={themeToggleLabel}
          title={themeToggleLabel}
        >
          <span className="theme-toggle__icon" aria-hidden="true">
            {isLightTheme ? (
              <svg viewBox="0 0 24 24" role="presentation">
                <path
                  d="M21 12.8A9 9 0 1 1 11.2 3a7.3 7.3 0 0 0 9.8 9.8Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" role="presentation">
                <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M12 2.8v2.3M12 18.9v2.3M21.2 12h-2.3M5.1 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </span>
        </button>
      </div>

      <main className="portfolio-main">
        <section className="header section-panel hero-panel">
          <h1 className="sr-only">{displayName}</h1>
          <p className="terminal-prompt" aria-hidden="true">
            nirav@backend:~$ whoami
          </p>
          <p className="name-typed-line" aria-hidden="true">
            <span className="name-typed-prefix">echo</span>
            <span className="name-typed-value" ref={typedNameRef} />
          </p>
          <p className="mobile-nameplate">{displayName}</p>
          <div className="ascii-title">
            <pre className="ascii-art large" aria-hidden="true">
              {asciiTitleLarge}
            </pre>
            <pre className="ascii-art small" aria-hidden="true">
              {asciiTitleSmall}
            </pre>
          </div>
          <div className="intro-copy">
            {introLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        <section id="tech-stack" className="section-panel tech-stack-panel">
          <h2>Tech Stack</h2>
          <div className="tech-carousel" aria-label="Primary tech stack logos">
            <div className="tech-carousel-track">
              {[...techLogos, ...techLogos].map((logo, index) => (
                <span className="tech-logo-item" key={`tech-main-${logo.name}-${index}`}>
                  <img src={logo.src} alt={logo.name} className="tech-logo" loading="lazy" />
                </span>
              ))}
            </div>
          </div>
          <div className="tech-carousel reverse" aria-label="Additional tech stack logos">
            <div className="tech-carousel-track">
              {[...techLogos.slice().reverse(), ...techLogos.slice().reverse()].map((logo, index) => (
                <span className="tech-logo-item" key={`tech-reverse-${logo.name}-${index}`}>
                  <img src={logo.src} alt={logo.name} className="tech-logo" loading="lazy" />
                </span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="job-history-section"
          className="job-history-section section-panel"
          aria-labelledby="job-history-heading"
        >
          <h2 id="job-history-heading">Professional Experience</h2>
          <div className="job-timeline">
            {jobHistory.map((employer) => (
              <article className="job-employer" key={employer.company}>
                <header className="job-employer__header">
                  <h3 className="job-employer__name">{employer.company}</h3>
                  <p className="job-employer__location">{employer.location}</p>
                </header>
                <div className="job-employer__positions">
                  {employer.positions.map((position) => (
                    <div
                      className="job-position"
                      key={`${employer.company}-${position.title}-${position.yearStart}`}
                    >
                      <h4 className="job-position__title">{position.title}</h4>
                      <p className="job-position__dates">
                        <span className="subtitle-year">
                          {position.yearStart} - {position.yearEnd}
                        </span>
                      </p>
                      <ul className="job-position__highlights">
                        {position.highlights.map((highlight) => (
                          <li key={`${position.title}-${highlight.slice(0, 36)}`}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section-panel projects-section">
          <h2>Projects</h2>
          <p className="meta-copy">Selected work from my public GitHub repositories.</p>
          <div className="projects-timeline">
            {projects.map((project) => (
              <article className="project-item" key={project.name}>
                <header className="project-item__header">
                  <h3 className="project-item__title">
                    <a href={project.href} target="_blank" rel="noreferrer">
                      {project.name}
                    </a>
                  </h3>
                  <span className="subtitle-year">{project.year}</span>
                </header>
                <p className="project-description">{project.description}</p>
                <ul className="project-highlights">
                  {project.highlights.map((highlight) => (
                    <li key={`${project.name}-${highlight.slice(0, 32)}`}>{highlight}</li>
                  ))}
                </ul>
                <div className="project-tags" aria-label={`${project.name} tags`}>
                  {project.tags.map((tag) => (
                    <span className={`tag ${tag}`} key={`${project.name}-${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section-panel">
          <h2>Technical Skills</h2>
          <div className="skills-matrix" role="list" aria-label="Technical skills by category">
            {skillGroups.map((skill) => {
              const stackItems = skill.stack.split(",").map((item) => item.trim());
              return (
                <article className="skill-row" role="listitem" key={skill.category}>
                  <h3 className="skill-row__category">{skill.category}</h3>
                  <ul className="skill-row__items">
                    {stackItems.map((item) => (
                      <li className="skill-pill" key={`${skill.category}-${item}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section id="links" className="section-panel links-panel">
          <h2>Links</h2>
          <div className="links-grid">
            {profileLinks.map((link) => (
              <a
                className={`link-tile ${link.id === "home" ? "home-link" : ""}`}
                key={link.id}
                href={link.href}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noreferrer" : undefined}
              >
                <img src={link.icon} alt="" aria-hidden="true" className="link-tile__icon" loading="lazy" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <section>
          <p>&copy; {new Date().getFullYear()} Nirav Parekh</p>
          <p>Developed and copyrighted by Nirav Parekh</p>
        </section>
      </footer>

      <nav className="floating-nav-left" aria-label="Quick navigation">
        <span className="floating-nav-left__label">Jump</span>
        <a href="#tech-stack">Tech</a>
        <a href="#job-history-section">Exp</a>
        <a href="#projects">Projects</a>
      </nav>

      <div className="floating-actions-right" aria-label="Quick actions">
        <a className="floating-action" href={contactInfo.phoneHref} aria-label="Call Nirav" title="Call">
          <svg viewBox="0 0 24 24" role="presentation">
            <path
              d="M6.6 3.8h2.8l1.4 4.1-2.2 1.7a16 16 0 0 0 5.8 5.8l1.7-2.2 4.1 1.4v2.8c0 .7-.6 1.3-1.3 1.3C10.7 18.7 5.3 13.3 5.3 5.1c0-.7.6-1.3 1.3-1.3Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <a className="floating-action" href={`mailto:${contactInfo.email}`} aria-label="Email Nirav" title="Email">
          <svg viewBox="0 0 24 24" role="presentation">
            <rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="m4.5 7 7.5 6 7.5-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <a
          className="floating-action"
          href={contactInfo.resumeHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Open resume in new tab"
          title="Resume"
        >
          <svg viewBox="0 0 24 24" role="presentation">
            <path
              d="M7 3.5h7.6l4.4 4.4v12.6a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M14.6 3.5v4.4H19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 12.2h6M9 15.5h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </>
  );
}

export default App;
