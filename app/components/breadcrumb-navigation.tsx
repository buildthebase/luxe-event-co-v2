import Link from "next/link";
import {
  getBreadcrumbItems,
  type BreadcrumbItem as NavigationBreadcrumbItem,
} from "../navigation-config";

export type BreadcrumbItem = NavigationBreadcrumbItem;

export function BreadcrumbNavigation({
  items,
  className,
}: {
  items: readonly BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={className ? `page-breadcrumbs ${className}` : "page-breadcrumbs"}
    >
      <ol>
        {items.map((item, index) => {
          const current = index === items.length - 1;

          return (
            <li key={item.href}>
              {current ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageBreadcrumbs({ path }: { path: string }) {
  const items = getBreadcrumbItems(path);

  return items.length > 0 ? <BreadcrumbNavigation items={items} /> : null;
}
