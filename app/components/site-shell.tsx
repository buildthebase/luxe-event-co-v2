import Link from "next/link";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { siteConfig } from "../site-config";
import { PageBreadcrumbs } from "./breadcrumb-navigation";
import {
  ExperiencePositioningSection,
  type ExperiencePositioningVariant,
} from "./experience-positioning-section";
import { MobileNavigation, PrimaryNavigation } from "./site-navigation";
import { InstagramLinks } from "./social-links";

const experiencePositioningByPath: Partial<
  Record<string, ExperiencePositioningVariant>
> = {
  "/experiences/coffee-bar": "coffee",
  "/experiences/sweet-cart": "sweet",
  "/experiences/seating-rentals": "seating",
};

const serviceExperienceSectionIndex = 3;

function useSharedExperiencePositioning(
  children: ReactNode,
  breadcrumbPath?: string,
): ReactNode {
  const variant = breadcrumbPath
    ? experiencePositioningByPath[breadcrumbPath]
    : undefined;

  if (!variant || !isValidElement(children) || children.type !== "main") {
    return children;
  }

  const main = children as ReactElement<{ children?: ReactNode }>;
  const mainChildren = Children.toArray(main.props.children);

  if (mainChildren.length <= serviceExperienceSectionIndex) {
    return children;
  }

  mainChildren[serviceExperienceSectionIndex] = (
    <ExperiencePositioningSection
      key={`experience-positioning-${variant}`}
      variant={variant}
    />
  );

  return cloneElement(main, undefined, mainChildren);
}

export function SiteShell({
  breadcrumbPath,
  children,
}: {
  breadcrumbPath?: string;
  children: ReactNode;
}) {
  const renderedChildren = useSharedExperiencePositioning(
    children,
    breadcrumbPath,
  );

  return (
    <div className="foundation-shell">
      <a className="foundation-skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="foundation-header">
        <Link href="/preview" className="foundation-wordmark" aria-label="Luxe Event Co. home">
          <span>Luxe</span>
          <small>Event Co.</small>
        </Link>
        <div className="foundation-header-actions">
          <PrimaryNavigation variant="desktop" />
          <InstagramLinks className="foundation-header-socials" />
        </div>
        <MobileNavigation />
      </header>
      <div className="foundation-main-target" id="main-content" tabIndex={-1}>
        {breadcrumbPath && <PageBreadcrumbs path={breadcrumbPath} />}
        {renderedChildren}
      </div>
      <footer className="foundation-footer">
        <div className="foundation-footer-identity">
          <span className="foundation-footer-wordmark">{siteConfig.name}</span>
          <span className="foundation-footer-location">{siteConfig.location}</span>
          <p>Coffee, dessert, and refined event settings—planned as one.</p>
        </div>
        <div className="foundation-footer-group">
          <span className="foundation-footer-label">Contact</span>
          <nav className="foundation-footer-contact" aria-label="Contact Luxe Event Co.">
            <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phoneDisplay}</a>
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </nav>
        </div>
        <div className="foundation-footer-group">
          <span className="foundation-footer-label">Explore our experiences</span>
          <nav className="foundation-footer-experiences" aria-label="Explore Luxe experiences">
            <Link href="/experiences/coffee-bar">
              COFFEE BAR
            </Link>
            <Link href="/experiences/sweet-cart">
              SWEET CART
            </Link>
            <Link href="/experiences/seating-rentals">
              SEATING RENTALS
            </Link>
          </nav>
        </div>
        <div className="foundation-footer-actions">
          <Link className="foundation-footer-cta" href="/inquire">
            Start a conversation <span aria-hidden="true">↗︎</span>
          </Link>
          <InstagramLinks className="foundation-footer-instagram" />
        </div>
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

export function FoundationLabel({ children }: { children: ReactNode }) {
  return <p className="foundation-label">{children}</p>;
}
