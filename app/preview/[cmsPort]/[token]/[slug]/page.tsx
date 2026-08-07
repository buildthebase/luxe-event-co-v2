import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePresentation } from "../../../../components/blog-article-presentation";
import type { BlogArticle } from "../../../../blog/content";

type PreviewPageProps = { params: Promise<{ cmsPort: string; token: string; slug: string }> };
type PreviewRecord = { token: string; expiresAt: number; article: BlogArticle };

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Local article preview",
  robots: { index: false, follow: false, noarchive: true },
};

async function readPreview(token: string, requestedPort: string) {
  if (!/^[a-f0-9]{48}$/.test(token)) return null;
  try {
    const parsedPort = Number(requestedPort);
    const port = Number.isInteger(parsedPort) && parsedPort >= 1024 && parsedPort <= 65535 ? parsedPort : 4317;
    const response = await fetch(`http://127.0.0.1:${port}/api/preview/${token}`, { cache: "no-store" });
    if (!response.ok) return null;
    const preview = await response.json() as PreviewRecord;
    if (preview.token !== token || preview.expiresAt < Date.now()) return null;
    return preview;
  } catch {
    return null;
  }
}

export default async function ArticlePreviewPage({ params }: PreviewPageProps) {
  const { cmsPort, token, slug } = await params;
  const preview = await readPreview(token, cmsPort);
  if (!preview || preview.article.slug !== slug) notFound();
  return <BlogArticlePresentation article={preview.article} />;
}
