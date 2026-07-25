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
}: {
  item: NavigationItem;
  pathname: string;
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
      <details data-current-section={sectionIsCurrent || undefined}>
        <summary>
          <span>{item.label}</span>
          <i aria-hidden="true" />
        </summary>
        <div className="foundation-nav-panel">
          <Link
            href={item.href}
            aria-current={currentState(pathname, item.href)}
          >
            All {item.label}
          </Link>
          {item.children.map((child) => (
            <Link
              href={child.href}
              aria-current={currentState(pathname, child.href)}
              key={child.href}
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

    function dismissFromOutside(event: PointerEvent) {
      if (navigationRef.current?.contains(event.target as Node)) {
        return;
      }

      navigationRef.current
        ?.querySelectorAll<HTMLDetailsElement>("details[open]")
        .forEach((disclosure) => closeDisclosure(disclosure));
    }

    document.addEventListener("pointerdown", dismissFromOutside);
    return () => document.removeEventListener("pointerdown", dismissFromOutside);
  }, [variant]);

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
        onToggle={handleDesktopToggle}
      >
        <ul>
          {navigationItems.map((item) => (
            <DesktopNavigationItem
              item={item}
              pathname={pathname}
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
        {navigationItems.map((item, index) => (
          <li
            className={
              item.children ? "foundation-mobile-nav-group" : undefined
            }
            key={item.href}
          >
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
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </Link>
            {item.children ? (
              <ul>
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
    </nav>
  );
}

export function MobileNavigation() {
  const disclosureRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

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
