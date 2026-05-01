import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { getReadingTime, formatPublishedDate } from "@/lib/blog";

interface BlogPostCardProps {
  post: BlogPost;
  /** Visual style. featured = larger card, eyebrow visible. */
  variant?: "default" | "featured";
}

export function BlogPostCard({ post, variant = "default" }: BlogPostCardProps) {
  const minutes = getReadingTime(post);

  if (variant === "featured") {
    return (
      <article className="group">
        <Link href={`/blog/${post.slug}`} className="block">
          <p className="text-xs uppercase tracking-[0.18em] text-brand mb-3 font-medium">
            {post.topic}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight group-hover:text-brand transition-colors duration-fast">
            {post.title}
          </h2>
          <p className="text-base text-ink/80 mt-4 leading-relaxed max-w-prose">
            {post.excerpt}
          </p>
          <p className="text-sm text-muted mt-5">
            <span className="text-ink">{post.author.name}</span>
            <span className="mx-2">·</span>
            <time dateTime={post.publishedAt}>
              {formatPublishedDate(post.publishedAt)}
            </time>
            <span className="mx-2">·</span>
            <span>{minutes} min read</span>
          </p>
        </Link>
      </article>
    );
  }

  return (
    <article className="group h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="block h-full p-5 lg:p-6 border border-line hover:border-ink rounded-sm transition-colors duration-fast"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-brand mb-3 font-medium">
          {post.topic}
        </p>
        <h3 className="text-lg font-semibold tracking-tight leading-snug group-hover:text-brand transition-colors duration-fast">
          {post.title}
        </h3>
        <p className="text-sm text-ink/75 mt-2 leading-relaxed">
          {post.excerpt}
        </p>
        <p className="text-xs text-muted mt-4">
          <time dateTime={post.publishedAt}>
            {formatPublishedDate(post.publishedAt)}
          </time>
          <span className="mx-1.5">·</span>
          {minutes} min read
        </p>
      </Link>
    </article>
  );
}
