import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticleBody } from "../../components/blog-article-body";
import { BlogJournalInquiry } from "../../components/blog-journal-inquiry";
import { BreadcrumbNavigation } from "../../components/breadcrumb-navigation";
import { JsonLd } from "../../components/json-ld";
import { ResponsiveImage } from "../../components/responsive-image";
import { SiteShell } from "../../components/site-shell";
import { createArticleMetadata } from "../../metadata-config";
import { createArticlePageSchema } from "../../schema-builders";
import {
  getPublishedBlogArticle,
  getPublishedBlogArticles,
  getRelatedPublishedBlogArticles,
  type BlogArticle,
} from "../content";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const contextualLinksByCategory: Record<
  string,
  readonly { href: string; label: string }[]
> = {
  "Coffee Catering": [
    { href: "/experiences/coffee-bar", label: "Explore Luxe Coffee Bar" },
  ],
  "Dessert Catering": [
    { href: "/experiences/sweet-cart", label: "Explore Luxe Sweet Cart" },
  ],
  "Event Rentals": [
    { href: "/experiences/seating-rentals", label: "Explore Luxe Seating Rentals" },
  ],
  Weddings: [
    { href: "/events/weddings", label: "Explore Luxe wedding experiences" },
  ],
  "Corporate Events": [
    { href: "/events/corporate-events", label: "Explore corporate event services" },
  ],
  "Brand Activations": [
    { href: "/events/brand-activations", label: "Explore brand activation services" },
  ],
  "Private Events": [
    { href: "/events/private-events", label: "Explore private event services" },
  ],
  "Event Planning": [
    { href: "/events/baby-showers", label: "Plan a baby shower" },
    { href: "/events/bridal-showers", label: "Plan a bridal shower" },
    { href: "/events/birthdays", label: "Plan a birthday celebration" },
  ],
};

function calculateReadingTime(content: BlogArticle["content"]) {
  const text = content.flatMap((block) => {
    if (block.type === "paragraph" || block.type === "callout") {
      return block.content.map((item) => item.text);
    }
    if (block.type === "heading") return [block.text];
    if (block.type === "list") return block.items.flatMap((item) => item.map((part) => part.text));
    if (block.type === "quote") return [block.quote, block.attribution ?? ""];
    if (block.type === "image") return [block.caption ?? ""];
    return [block.caption ?? "", ...block.headers, ...block.rows.flat()];
  }).join(" ");
  const wordCount = text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;

  return Math.max(1, Math.ceil(wordCount / 200));
}

export function generateStaticParams() {
  return getPublishedBlogArticles().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedBlogArticle(slug);

  if (!article) {
    return { robots: { index: false, follow: false } };
  }

  return createArticleMetadata(article);
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getPublishedBlogArticle(slug);

  if (!article) notFound();

  const path = `/blog/${article.slug}`;
  const relatedArticles = getRelatedPublishedBlogArticles(article);
  const contextualLinks = contextualLinksByCategory[article.category] ?? [];
  const readingTime = calculateReadingTime(article.content);
  const heroImage = article.heroImage
    ? { ...article.heroImage, alt: article.heroAlt, priority: true }
    : null;
  const schema = createArticlePageSchema({ article, path });
  const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedDate = dateFormatter.format(new Date(article.publishDate));
  const formattedModifiedDate = dateFormatter.format(new Date(article.modifiedDate));
  const showModifiedDate = article.modifiedDate !== article.publishDate;

  return (
    <SiteShell>
      <BreadcrumbNavigation
        items={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Blog" },
          { href: path, label: article.title },
        ]}
      />
      <main className="blog-article-page">
        <article>
          <header className="blog-article-hero">
            <div>
              <p>{article.category}</p>
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <div>
                <span>By {article.author.name}</span>
                <span>{readingTime} min read</span>
                <span>Published <time dateTime={article.publishDate}>{formattedDate}</time></span>
                {showModifiedDate ? (
                  <span>Updated <time dateTime={article.modifiedDate}>{formattedModifiedDate}</time></span>
                ) : null}
              </div>
            </div>
            {heroImage ? (
              <figure>
                <ResponsiveImage asset={heroImage} />
              </figure>
            ) : null}
          </header>
          <BlogArticleBody content={article.content} />
          {contextualLinks.length ? (
            <aside className="blog-context-links" aria-labelledby="blog-context-links-title">
              <p id="blog-context-links-title">Continue planning with Luxe</p>
              <div>
                {contextualLinks.map((contextLink) => (
                  <Link href={contextLink.href} key={contextLink.href}>
                    {contextLink.label} <span aria-hidden="true">↗︎</span>
                  </Link>
                ))}
              </div>
            </aside>
          ) : null}
        </article>
        {relatedArticles.length ? (
          <aside className="blog-related" aria-labelledby="blog-related-title">
            <h2 id="blog-related-title">Continue reading</h2>
            <div>
              {relatedArticles.map((related) => (
                <Link href={`/blog/${related.slug}`} key={related.slug}>
                  <small>{related.category}</small>
                  <strong>{related.title}</strong>
                  <p>{related.excerpt}</p>
                  <span aria-hidden="true">↗︎</span>
                </Link>
              ))}
            </div>
          </aside>
        ) : null}
        <BlogJournalInquiry />
      </main>
      <JsonLd data={schema} />
    </SiteShell>
  );
}
