"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type KeyboardEvent,
  type SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { navigationItems, type NavigationItem } from "../navigation-config";
import { InstagramLinks } from "./social-links";

function currentState(pathname: string, href: string) {
  if (pathname === href) {
    return "page";
  }

  if (href !== "/" && pathname.startsWith(`${href}/`)) {
    return "location";
  }

  return undefined;
}

function closeDisclosure(
  disclosure: HTMLDetailsElement,
  returnFocus = false,
) {
  disclosure.open = false;

  if (returnFocus) {
    disclosure.querySelector<HTMLElement>("summary")?.focus();
  }
}

function DesktopNavigationItem({
  item,
  pathname,
  onToggle,
}: {
  item: NavigationItem;
  pathname: string;
  onToggle: (event: SyntheticEvent<HTMLDetailsElement>) => void;
}) {
  if (!item.children) {
    return (
      <li>
        <Link
          href={item.href}
          className={
            item.emphasis === "inquiry" ? "foundation-nav-cta" : undefined
          }
          aria-current={currentState(pathname, item.href)}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  const sectionIsCurrent =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <li className="foundation-nav-group">
      <details
        data-current-section={sectionIsCurrent || undefined}
        onToggle={onToggle}
      >
        <summary>
          <span>{item.label}</span>
          <i aria-hidden="true" />
        </summary>
        <div className="foundation-nav-panel">
          <Link
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            onClick={(event) => {
              const disclosure = event.currentTarget.closest("details");
              if (disclosure) closeDisclosure(disclosure);
            }}
          >
            View all {item.label}
          </Link>
          {item.children.map((child) => (
            <Link
              href={child.href}
              aria-current={currentState(pathname, child.href)}
              key={child.href}
              onClick={(event) => {
                const disclosure = event.currentTarget.closest("details");
                if (disclosure) closeDisclosure(disclosure);
              }}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </details>
    </li>
  );
}

export function PrimaryNavigation({
  variant,
  onNavigate,
}: {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (variant !== "desktop") {
      return;
    }

    function dismissAllDisclosures() {
      navigationRef.current
        ?.querySelectorAll<HTMLDetailsElement>("details[open]")
        .forEach((disclosure) => closeDisclosure(disclosure));
    }

    function dismissFromOutside(event: PointerEvent) {
      if (navigationRef.current?.contains(event.target as Node)) {
        return;
      }

      dismissAllDisclosures();
    }

    document.addEventListener("pointerdown", dismissFromOutside);
    window.addEventListener("scroll", dismissAllDisclosures, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", dismissFromOutside);
      window.removeEventListener("scroll", dismissAllDisclosures);
    };
  }, [pathname, variant]);

  function handleDesktopToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    if (!event.currentTarget.open) {
      return;
    }

    navigationRef.current
      ?.querySelectorAll<HTMLDetailsElement>("details[open]")
      .forEach((disclosure) => {
        if (disclosure !== event.currentTarget) {
          closeDisclosure(disclosure);
        }
      });
  }

  function handleDesktopKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Escape") {
      return;
    }

    const disclosure = (event.target as HTMLElement).closest("details");
    if (disclosure?.open) {
      event.preventDefault();
      closeDisclosure(disclosure, true);
    }
  }

  if (variant === "desktop") {
    return (
      <nav
        ref={navigationRef}
        className="foundation-desktop-nav"
        aria-label="Primary navigation"
        onKeyDown={handleDesktopKeyDown}
      >
        <ul>
          {navigationItems.map((item) => (
            <DesktopNavigationItem
              item={item}
              pathname={pathname}
              onToggle={handleDesktopToggle}
              key={item.href}
            />
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="Mobile primary navigation">
      <ul className="foundation-mobile-nav-list">
        {navigationItems.map((item) => (
          <li
            className={
              item.children ? "foundation-mobile-nav-group" : undefined
            }
            key={item.href}
          >
            {item.children ? (
              <span className="foundation-mobile-nav-heading">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={
                  item.emphasis === "inquiry"
                    ? "foundation-nav-cta"
                    : undefined
                }
                aria-current={currentState(pathname, item.href)}
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            )}
            {item.children ? (
              <ul>
                <li className="foundation-mobile-nav-hub">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={onNavigate}
                  >
                    View all {item.label}
                  </Link>
                </li>
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      aria-current={currentState(pathname, child.href)}
                      onClick={onNavigate}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
      <InstagramLinks className="foundation-mobile-nav-socials" />
    </nav>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();
  const disclosureRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const disclosure = disclosureRef.current;
    if (disclosure?.open) {
      disclosure.open = false;
    }
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function closeMobileMenu(returnFocus = false) {
    const disclosure = disclosureRef.current;
    if (!disclosure) {
      return;
    }

    closeDisclosure(disclosure, returnFocus);
    setIsOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key === "Escape" && disclosureRef.current?.open) {
      event.preventDefault();
      closeMobileMenu(true);
    }
  }

  return (
    <details
      ref={disclosureRef}
      className="foundation-mobile-nav"
      onKeyDown={handleKeyDown}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary aria-expanded={isOpen}>
        <span>{isOpen ? "Close" : "Menu"}</span>
        <i aria-hidden="true" />
      </summary>
      <PrimaryNavigation
        variant="mobile"
        onNavigate={() => closeMobileMenu()}
      />
    </details>
  );
}
