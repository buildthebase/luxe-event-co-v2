const brands = [
  {
    id: "coffee",
    index: "01",
    name: "Luxe Coffee Bar",
    descriptor: "Warm pours. Considered rituals.",
    handle: "@luxecoffeebar.to",
    href: "https://www.instagram.com/luxecoffeebar.to/",
  },
  {
    id: "sweet",
    index: "02",
    name: "Luxe Sweet Cart",
    descriptor: "Small indulgences, beautifully staged.",
    handle: "@luxesweet.cart",
    href: "https://www.instagram.com/luxesweet.cart/",
  },
  {
    id: "seating",
    index: "03",
    name: "Luxe Seating Rentals",
    descriptor: "Form, function, and room to gather.",
    handle: "@luxeseatingrentals",
    href: "https://www.instagram.com/luxeseatingrentals",
  },
] as const;

export default function Home() {
  return (
    <main className="site-stage">
      <section className="constellation" aria-labelledby="luxe-title">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <header className="masthead">
          <p>Toronto, Canada</p>
          <p className="masthead-center">One house. Three gestures.</p>
          <p>Est. 2025</p>
        </header>

        <div className="orbit" aria-hidden="true">
          <span className="orbit-dot orbit-dot-one" />
          <span className="orbit-dot orbit-dot-two" />
          <span className="orbit-dot orbit-dot-three" />
        </div>

        <div className="identity">
          <p className="identity-kicker">A new event language</p>
          <h1 id="luxe-title">
            <span className="identity-luxe">Luxe</span>
            <span className="identity-event">Event Co.</span>
          </h1>
          <p className="identity-copy">
            Coffee, confections, and considered spaces for gatherings that live
            beyond the moment.
          </p>
          <p className="identity-coming">Full experience in formation</p>
        </div>

        {brands.map((brand) => (
          <article className={`brand-object brand-${brand.id}`} key={brand.id}>
            <div className="object-art" aria-hidden="true">
              <span className="art-layer art-layer-one" />
              <span className="art-layer art-layer-two" />
              <span className="art-layer art-layer-three" />
            </div>
            <div className="brand-copy">
              <p className="brand-index">{brand.index}</p>
              <h2>{brand.name}</h2>
              <p className="brand-description">{brand.descriptor}</p>
              <a
                href={brand.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Follow ${brand.name} on Instagram`}
              >
                <span>Follow on Instagram</span>
                <span className="brand-handle">{brand.handle}</span>
              </a>
            </div>
          </article>
        ))}

        <footer className="stage-footer">
          <p>For the host with an eye for the whole picture.</p>
          <p>Scroll to enter <span aria-hidden="true">↓</span></p>
        </footer>
      </section>

      <section className="afterword" aria-label="Coming soon">
        <p>Luxe Event Co. is coming together. Follow the orbit for what&apos;s next.</p>
        <span>LEC</span>
      </section>
    </main>
  );
}
