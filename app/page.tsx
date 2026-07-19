const experiences = [
  {
    number: "01",
    name: "Luxe Coffee Bar",
    category: "Coffee experiences",
    description:
      "A polished mobile coffee bar serving beautifully crafted drinks and an effortlessly elevated guest experience.",
    handle: "@luxecoffeebar.to",
    href: "https://www.instagram.com/luxecoffeebar.to/",
    tone: "coffee",
  },
  {
    number: "02",
    name: "Luxe Sweet Cart",
    category: "Dessert experiences",
    description:
      "A refined dessert cart designed to turn a sweet moment into a memorable part of the celebration.",
    handle: "@luxesweet.cart",
    href: "https://www.instagram.com/luxesweet.cart/",
    tone: "sweet",
  },
  {
    number: "03",
    name: "Luxe Seating Rentals",
    category: "Event rentals",
    description:
      "Considered seating and statement pieces that bring comfort, character, and cohesion to any setting.",
    handle: "@luxeseatingrentals",
    href: "https://www.instagram.com/luxeseatingrentals",
    tone: "seating",
  },
] as const;

function InstagramMark() {
  return (
    <svg
      aria-hidden="true"
      className="instagram-mark"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.7" cy="6.4" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      className="arrow"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M5 12h13M13.5 6.5 19 12l-5.5 5.5" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <nav className="nav shell" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="Luxe Event Co. home">
            <span>Luxe</span>
            <span className="wordmark-sub">Event Co.</span>
          </a>
          <a className="nav-link" href="#experiences">
            Discover the family <span aria-hidden="true">↓</span>
          </a>
        </nav>

        <div className="hero-body shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow reveal reveal-one">Toronto · Elevated event experiences</p>
            <h1 id="hero-title" className="reveal reveal-two">
              Made for moments
              <span>worth lingering over.</span>
            </h1>
            <p className="hero-intro reveal reveal-three">
              Luxe Event Co. brings together premium coffee, dessert, and event
              rental experiences under one thoughtfully curated family.
            </p>
          </div>

          <div className="brand-composition reveal reveal-four" aria-hidden="true">
            <div className="composition-orbit" />
            <div className="composition-card card-coffee">
              <span>01</span>
              <strong>Coffee</strong>
            </div>
            <div className="composition-card card-sweet">
              <span>02</span>
              <strong>Sweet</strong>
            </div>
            <div className="composition-card card-seating">
              <span>03</span>
              <strong>Seating</strong>
            </div>
            <p className="composition-note">One family, beautifully considered.</p>
          </div>
        </div>

        <div className="hero-foot shell">
          <span>Designed for celebrations of every kind</span>
          <span aria-hidden="true">L · E · C</span>
        </div>
      </section>

      <section className="intro shell" aria-labelledby="intro-title">
        <div>
          <p className="section-label">The Luxe family</p>
          <span className="fine-line" />
        </div>
        <div className="intro-copy">
          <h2 id="intro-title">
            Three distinct experiences.
            <span>One elevated point of view.</span>
          </h2>
          <p>
            From the first pour to the final detail, every Luxe experience is
            created to feel warm, seamless, and unmistakably special.
          </p>
        </div>
      </section>

      <section className="experiences" id="experiences" aria-label="Our brands">
        {experiences.map((experience) => (
          <article className={`experience ${experience.tone}`} key={experience.name}>
            <div className="experience-inner shell">
              <div className="experience-index">
                <span>{experience.number}</span>
                <span className="experience-dot" />
              </div>
              <div className="experience-title">
                <p>{experience.category}</p>
                <h3>{experience.name}</h3>
              </div>
              <p className="experience-description">{experience.description}</p>
              <a
                className="social-link"
                href={experience.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Follow ${experience.name} on Instagram`}
              >
                <InstagramMark />
                <span>{experience.handle}</span>
                <Arrow />
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="coming-soon" aria-labelledby="coming-soon-title">
        <div className="coming-soon-inner shell">
          <p className="section-label light">Coming soon</p>
          <div className="coming-copy">
            <h2 id="coming-soon-title">
              The full Luxe experience is taking shape.
            </h2>
            <p>
              Our new online home is coming soon. Until then, follow each brand
              for our latest events, offerings, and booking details.
            </p>
          </div>
          <span className="monogram" aria-hidden="true">L</span>
        </div>
      </section>

      <footer className="footer shell">
        <a className="wordmark footer-mark" href="#top" aria-label="Back to top">
          <span>Luxe</span>
          <span className="wordmark-sub">Event Co.</span>
        </a>
        <p>Premium experiences for beautifully hosted moments.</p>
        <p>Toronto, Ontario · © {new Date().getFullYear()} Luxe Event Co.</p>
      </footer>
    </main>
  );
}
