import { siteConfig } from "../site-config";

const instagramLinks = [
  { href: siteConfig.socialProfiles.coffeeBar, label: "Luxe Coffee Bar" },
  { href: siteConfig.socialProfiles.sweetCart, label: "Luxe Sweet Cart" },
  { href: siteConfig.socialProfiles.seatingRentals, label: "Luxe Seating Rentals" },
] as const;

export function InstagramLinks({ className }: { className: string }) {
  return (
    <nav className={className} aria-label="Luxe experiences on Instagram">
      {instagramLinks.map((link) => (
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${link.label} on Instagram, opens in a new tab`}
          key={link.href}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4.25" />
            <circle className="instagram-dot" cx="17.4" cy="6.7" r="1" />
          </svg>
        </a>
      ))}
    </nav>
  );
}
