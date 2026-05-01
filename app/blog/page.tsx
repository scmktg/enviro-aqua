import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/sections/Blog/BlogPostCard";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";

export const metadata: Metadata = {
  title:
    "Blog — Water Filter Guides for Australian Homes | Enviro Aqua",
  description:
    "Hyper-practical guides to water filtration for Australian homes and commercial sites. Whole house systems, reverse osmosis, tank water, certifications and maintenance — written by working specialists.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — Water Filter Guides for Australian Homes",
    description:
      "Practical guides to water filtration for Australian homes and commercial sites. Written by working specialists.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  if (posts.length === 0) {
    return (
      <div className="container-site py-12">
        <p className="text-base text-muted">No posts published yet.</p>
      </div>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <div className="container-site py-8 lg:py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <header className="mt-6 mb-12 lg:mb-16 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
          The Enviro Aqua Blog
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
          Water filter guides for Australian homes and commercial sites.
        </h1>
        <p className="text-lg text-ink/80 mt-5 leading-relaxed">
          Plain-English guides on filtration, certifications and maintenance.
          Written by people who install these systems for a living, not by a
          marketing team.
        </p>
      </header>

      <section
        aria-label="Latest article"
        className="border-y border-line py-12 lg:py-16 mb-12 lg:mb-16"
      >
        <BlogPostCard post={featured!} variant="featured" />
      </section>

      <section aria-label="All articles">
        <h2 className="text-xs uppercase tracking-[0.18em] text-muted mb-6">
          Earlier articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {rest.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
