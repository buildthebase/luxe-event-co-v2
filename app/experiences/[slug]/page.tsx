import { notFound } from "next/navigation";
import { CoffeeBarPage } from "../../components/coffee-bar-page";
import { ExperienceDetail } from "../../components/route-detail";
import { SeatingRentalsPage } from "../../components/seating-rentals-page";
import { SweetCartPage } from "../../components/sweet-cart-page";
import { createPageMetadata, type PagePath } from "../../metadata-config";
import { experiences, getExperience, type ExperienceSlug } from "../../site-config";

export function generateStaticParams() { return experiences.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getExperience(slug);

  if (!item) return {};
  return createPageMetadata(`/experiences/${slug}` as PagePath);
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!getExperience(slug)) notFound();
  if (slug === "coffee-bar") return <CoffeeBarPage />;
  if (slug === "sweet-cart") return <SweetCartPage />;
  if (slug === "seating-rentals") return <SeatingRentalsPage />;

  return <ExperienceDetail slug={slug as ExperienceSlug} />;
}
