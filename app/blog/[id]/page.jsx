import { BLOG_POSTS } from "@/data/content";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ id: post.id }));
}

export async function generateMetadata({ params }) {
  const post = BLOG_POSTS.find(p => p.id === params.id);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const post = BLOG_POSTS.find(p => p.id === params.id);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "CardStack" },
    publisher: { "@type": "Organization", name: "CardStack" },
    articleSection: post.category,
  };

  // Find related posts (same category, excluding current)
  const related = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);
  const otherPosts = related.length < 2
    ? [...related, ...BLOG_POSTS.filter(p => p.id !== post.id && p.category !== post.category).slice(0, 2 - related.length)]
    : related;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article className="pt-24 pb-20 px-6 max-w-[720px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: "var(--text-faint)" }}>
          <Link href="/" className="no-underline hover:underline" style={{ color: "var(--text-faint)" }}>Home</Link>
          <span>/</span>
          <Link href="/blog" className="no-underline hover:underline" style={{ color: "var(--text-faint)" }}>Blog</Link>
          <span>/</span>
          <span style={{ color: "var(--text-muted)" }}>{post.category}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-semibold rounded-md px-2.5 py-1" style={{ color: post.color, background: `${post.color}12` }}>{post.category}</span>
            <span className="text-sm" style={{ color: "var(--text-faint)" }}>{post.date}</span>
            <span className="text-sm" style={{ color: "var(--text-faint)" }}>· {post.readTime} read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-4" style={{ color: "var(--text)" }}>
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {post.excerpt}
          </p>
          <div className="mt-6 h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* Content */}
        <div className="mb-12">
          {post.content?.map((block, i) => {
            if (block.type === "h2") {
              return <h2 key={i} className="text-xl font-bold mt-8 mb-3" style={{ color: "var(--text)" }}>{block.text}</h2>;
            }
            if (block.type === "h3") {
              return <h3 key={i} className="text-lg font-bold mt-6 mb-2" style={{ color: "var(--text)" }}>{block.text}</h3>;
            }
            return <p key={i} className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{block.text}</p>;
          })}

          {!post.content && (
            <div className="rounded-2xl p-8 text-center" style={{ background: "var(--bg-muted)" }}>
              <div className="text-4xl mb-3">📝</div>
              <p className="text-base font-semibold mb-2" style={{ color: "var(--text)" }}>Full article coming soon</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>We're working on this one. Check back shortly!</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-7 text-center mb-10" style={{ background: "var(--accent-light)", border: "1px solid var(--accent-border)" }}>
          <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text)" }}>Want to try these strategies?</h3>
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Use our free tools to find the best card for your spending.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/smart-swipe" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white no-underline rounded-lg px-6 py-2.5 text-sm font-semibold">Smart Swipe Guide →</Link>
            <Link href="/swipe-check" className="rounded-lg px-6 py-2.5 text-sm font-semibold no-underline" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text)" }}>Swipe Check →</Link>
          </div>
        </div>

        {/* Related Posts */}
        {otherPosts.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>Read Next</h3>
            <div className="flex flex-col gap-3">
              {otherPosts.map(p => (
                <Link key={p.id} href={`/blog/${p.id}`} className="rounded-xl p-5 flex items-start gap-3.5 no-underline transition-all hover:shadow-md"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
                  <div className="w-1 h-11 rounded flex-shrink-0 mt-0.5" style={{ background: p.color }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[11px] font-semibold rounded px-2 py-0.5" style={{ color: p.color, background: `${p.color}10` }}>{p.category}</span>
                      <span className="text-xs" style={{ color: "var(--text-faint)" }}>{p.readTime}</span>
                    </div>
                    <h4 className="text-base font-bold leading-snug" style={{ color: "var(--text)" }}>{p.title}</h4>
                  </div>
                  <span className="text-sm font-semibold self-center" style={{ color: "var(--accent-text)" }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
