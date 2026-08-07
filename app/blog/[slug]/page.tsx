import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogArticlePresentation } from "../../components/blog-article-presentation";
import { JsonLd } from "../../components/json-ld";
import { createArticleMetadata } from "../../metadata-config";
import { createArticlePageSchema } from "../../schema-builders";
import {
  getArchivedBlogArticle,
  getPublishedBlogArticle,
  getPublishedBlogArticles,
  getRetainedArchivedBlogArticles,
} from "../content";

type BlogArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...getPublishedBlogArticles(), ...getRetainedArchivedBlogArticles()].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedBlogArticle(slug);
  const archivedArticle = getArchivedBlogArticle(slug);

  if (!article && archivedArticle?.archiveDisposition === "retain-noindex") {
    return {
      title: archivedArticle.seoTitle,
      description: archivedArticle.description,
      alternates: { canonical: `/blog/${archivedArticle.slug}` },
      robots: { index: false, follow: true },
    };
  }
  if (!article) return { robots: { index: false, follow: false } };
  return createArticleMetadata(article);
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getPublishedBlogArticle(slug);

  if (!article) {
    const archivedArticle = getArchivedBlogArticle(slug);
    if (archivedArticle?.archiveDisposition === "redirect" && archivedArticle.redirectTo) permanentRedirect(archivedArticle.redirectTo);
    if (archivedArticle?.archiveDisposition === "retain-noindex") {
      return <BlogArticlePresentation article={archivedArticle} showPlanningLinks={false} showPublishedDetails={false} showRelatedArticles={false} />;
    }
    notFound();
  }

  const path = `/blog/${article.slug}`;
  return (
    <>
      <BlogArticlePresentation article={article} />
      <JsonLd data={createArticlePageSchema({ article, path })} />
    </>
  );
}
