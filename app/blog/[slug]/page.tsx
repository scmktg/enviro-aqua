import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getReadingTime,
  formatPublishedDate,
} from "@/lib/blog";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { BlogContent } from "@/components/sections/Blog/BlogContent";
import { BlogPostCard } from "@/components/sections/Blog/BlogPostCard";
import { articleJsonLd, breadcrumbJsonLd, siteUrl } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const minutes = getReadingTime(post);

  // Build a table of contents from H2 blocks that have IDs.
  const toc = post.body
    .filter((b): b is Extract<typeof b, { type: "heading" }> => b.type === "heading")
    .filter((b) => b.level === 2 && b.id);

  const trail = [
    { label: "Home", url: "/" },
    { label: "Blog", url: "/blog" },
    { label: post.title, url: `/blog/${post.slug}` },
  ];

  return (
    <article className="container-site py-8 lg:py-10">
      <Breadcrumbs trail={trail.map((t) => ({ label: t.label, href: t.url }))} />

      <header className="mt-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-brand mb-4 font-medium">
          {post.topic}
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
          {post.title}
        </h1>
        <p className="text-lg text-ink/80 mt-5 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-7 pb-7 border-b border-line flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <span className="text-ink font-medium">{post.author.name}</span>
          <span>{post.author.role}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>
            {formatPublishedDate(post.publishedAt)}
          </time>
          <span aria-hidden>·</span>
          <span>{minutes} min read</span>
        </div>
      </header>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-16">
        <div>
          <BlogContent blocks={post.body} />

          {/*
            Up-next footer — drives the brand's internal linking goal.
            Every post must point readers back to relevant category and
            product pages, both for SEO and because the post is genuinely
            answering a buying-decision question.
          */}
          {(post.relatedCategories?.length ?? 0) > 0 && (
            <section
              aria-label="Up next"
              className="mt-12 pt-10 border-t border-line"
            >
              <h2 className="text-xs uppercase tracking-[0.18em] text-muted mb-4">
                Continue browsing
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {post.relatedCategories!.map((cat) => (
                  <li key={cat.href}>
                    <Link
                      href={cat.href}
                      className="group flex items-center justify-between gap-4 p-4 border border-line hover:border-ink rounded-sm transition-colors duration-fast"
                    >
                      <span className="font-medium text-ink group-hover:text-brand transition-colors duration-fast">
                        {cat.label}
                      </span>
                      <span
                        aria-hidden
                        className="text-brand text-sm group-hover:translate-x-0.5 transition-transform duration-fast"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/*
          Sidebar — sticky table of contents on desktop. Hidden on mobile
          (the post is meant to be read top-to-bottom on a phone; a sticky
          ToC there competes for screen real estate).
        */}
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            {toc.length > 0 && (
              <nav aria-label="Table of contents">
                <p className="text-xs uppercase tracking-[0.18em] text-muted mb-4">
                  In this article
                </p>
                <ol className="space-y-2.5 text-sm border-l border-line pl-4">
                  {toc.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className="text-ink/75 hover:text-brand transition-colors duration-fast leading-snug block"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section
          aria-label="Related articles"
          className="mt-16 lg:mt-24 pt-12 border-t border-line"
        >
          <h2 className="text-2xl font-semibold tracking-tight mb-8">
            More from the blog
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {related.map((p) => (
              <BlogPostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: articleJsonLd({
            title: post.title,
            description: post.description,
            url: siteUrl(`/blog/${post.slug}`),
            authorName: post.author.name,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt ?? post.publishedAt,
            keywords: post.keywords,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail) }}
      />
    </article>
  );
}
