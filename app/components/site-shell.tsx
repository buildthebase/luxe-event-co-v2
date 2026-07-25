import Link from "next/link";
import { siteConfig } from "../site-config";
import { PageBreadcrumbs } from "./breadcrumb-navigation";
import { MobileNavigation, PrimaryNavigation } from "./site-navigation";

export function SiteShell({
  breadcrumbPath,
  children,
}: {
  breadcrumbPath?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="foundation-shell">
      <a className="foundation-skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="foundation-header">
        <Link href="/" className="foundation-wordmark" aria-label="Luxe Event Co. home">
          <span>Luxe</span>
          <small>Event Co.</small>
        </Link>
        <PrimaryNavigation variant="desktop" />
        <MobileNavigation />
      </header>
      <div className="foundation-main-target" id="main-content" tabIndex={-1}>
        {breadcrumbPath && <PageBreadcrumbs path={breadcrumbPath} />}
        {children}
      </div>
      <footer className="foundation-footer">
        <div className="foundation-footer-identity">
          <span className="foundation-footer-wordmark">{siteConfig.name}</span>
          <span className="foundation-footer-location">{siteConfig.location}</span>
          <p>Coffee, dessert, and considered event settings—planned as one.</p>
        </div>
        <div className="foundation-footer-group">
          <span className="foundation-footer-label">Contact</span>
          <nav className="foundation-footer-contact" aria-label="Contact Luxe Event Co.">
            <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phoneDisplay}</a>
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </nav>
        </div>
        <div className="foundation-footer-group">
          <span className="foundation-footer-label">Follow</span>
          <nav className="foundation-footer-socials" aria-label="Luxe divisions on Instagram">
            <a
              href={siteConfig.socialProfiles.coffeeBar}
              target="_blank"
              rel="noreferrer"
              aria-label="Luxe Coffee Bar on Instagram, opens in a new tab"
            >
              Coffee
            </a>
            <a
              href={siteConfig.socialProfiles.sweetCart}
              target="_blank"
              rel="noreferrer"
              aria-label="Luxe Sweet Cart on Instagram, opens in a new tab"
            >
              Dessert
            </a>
            <a
              href={siteConfig.socialProfiles.seatingRentals}
              target="_blank"
              rel="noreferrer"
              aria-label="Luxe Seating Rentals on Instagram, opens in a new tab"
            >
              Seating
            </a>
          </nav>
        </div>
        <Link className="foundation-footer-cta" href="/inquire">
          Start a conversation <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </div>
  );
}

type FoundationIntroProps = {
  eyebrow: string;
  title: string;
  titleLines?: readonly [string, string];
  description: string;
};

export function FoundationIntro({ eyebrow, title, titleLines, description }: FoundationIntroProps) {
  return (
    <header className="foundation-intro">
      <p className="foundation-eyebrow">{eyebrow}</p>
      <h1
        className={titleLines ? "foundation-title-controlled" : undefined}
        aria-label={titleLines ? title : undefined}
      >
        {titleLines
          ? titleLines.map((line) => (
              <span className="foundation-title-line" aria-hidden="true" key={line}>
                {line}
              </span>
            ))
          : title}
      </h1>
      <p>{description}</p>
    </header>
  );
}

export function FoundationLabel({ children }: { children: React.ReactNode }) {
  return <p className="foundation-label">{children}</p>;
}
