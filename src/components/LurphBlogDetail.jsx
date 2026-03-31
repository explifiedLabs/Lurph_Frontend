import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Twitter, Linkedin, Copy, Check } from "lucide-react";
import { Link, useParams } from "react-router";

const SITE_ID = "69c7aac4b4e0d5c00d96e3f2";
const FALLBACK = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2400&auto=format&fit=crop";

/* ─── Shimmer primitive ─── */
const Shimmer = ({ style = {}, className = "" }) => (
  <div
    className={className}
    style={{
      background:
        "linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)",
      backgroundSize: "400% 100%",
      animation: "shimmerSlide 1.6s ease-in-out infinite",
      ...style,
    }}
  />
);

/* ─── Full page skeleton ─── */
const DetailSkeleton = () => (
  <div className="bg-[#050505] min-h-screen">
    {/* header skeleton */}
    <header className="pt-32 pb-20 px-6 max-w-4xl mx-auto flex flex-col items-center gap-6">
      <Shimmer style={{ width: 120, height: 12, borderRadius: 8 }} />
      <Shimmer style={{ width: 80, height: 28, borderRadius: 999 }} />
      <Shimmer style={{ width: "75%", height: 56, borderRadius: 14 }} />
      <Shimmer style={{ width: "55%", height: 44, borderRadius: 14 }} />
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <Shimmer style={{ width: 90, height: 14, borderRadius: 7 }} />
        <Shimmer style={{ width: 110, height: 14, borderRadius: 7 }} />
      </div>
    </header>

    {/* hero image skeleton */}
    <div className="max-w-6xl mx-auto px-6 mb-24">
      <Shimmer style={{ width: "100%", aspectRatio: "21/9", borderRadius: 48 }} />
    </div>

    {/* content grid skeleton */}
    <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-32">
      {/* left aside */}
      <aside className="lg:col-span-3 hidden lg:flex flex-col gap-8 pt-2">
        <Shimmer style={{ width: 100, height: 10, borderRadius: 6 }} />
        {[...Array(5)].map((_, i) => (
          <Shimmer key={i} style={{ width: `${60 + i * 7}%`, height: 12, borderRadius: 6 }} />
        ))}
        <div style={{ marginTop: 16 }}>
          <Shimmer style={{ width: 100, height: 10, borderRadius: 6, marginBottom: 20 }} />
          <div style={{ display: "flex", gap: 8 }}>
            {[...Array(3)].map((_, i) => (
              <Shimmer key={i} style={{ width: 40, height: 40, borderRadius: 12 }} />
            ))}
          </div>
        </div>
      </aside>

      {/* prose */}
      <main className="lg:col-span-6 flex flex-col gap-5">
        {[100, 90, 85, 95, 80, 88, 70, 92, 75, 60, 85, 95, 78].map((w, i) => (
          <Shimmer key={i} style={{ width: `${w}%`, height: i % 5 === 0 ? 28 : 16, borderRadius: 8 }} />
        ))}
        <Shimmer style={{ width: "100%", height: 200, borderRadius: 24, margin: "16px 0" }} />
        {[88, 95, 70, 82, 90, 65, 78].map((w, i) => (
          <Shimmer key={`b${i}`} style={{ width: `${w}%`, height: 16, borderRadius: 8 }} />
        ))}
      </main>

      {/* right aside */}
      <aside className="lg:col-span-3 hidden lg:flex flex-col gap-8 pt-2">
        <Shimmer style={{ width: 110, height: 10, borderRadius: 6 }} />
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Shimmer style={{ width: "100%", aspectRatio: "16/9", borderRadius: 16 }} />
            <Shimmer style={{ width: "85%", height: 13, borderRadius: 6 }} />
            <Shimmer style={{ width: "65%", height: 13, borderRadius: 6 }} />
          </div>
        ))}
      </aside>
    </div>
  </div>
);

/* ─── Explore card shimmer ─── */
const ExploreShimmer = () => (
  <div>
    <Shimmer style={{ width: "100%", aspectRatio: "16/10", borderRadius: 32, marginBottom: 20 }} />
    <Shimmer style={{ width: "85%", height: 18, borderRadius: 8, marginBottom: 8 }} />
    <Shimmer style={{ width: "65%", height: 18, borderRadius: 8 }} />
  </div>
);

export default function LurphBlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const [explorePosts, setExplorePosts] = useState([]);
  const [tocLinks, setTocLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeToc, setActiveToc] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [postRes, allRes] = await Promise.all([
          fetch(`https://cmsapi-pf6diz22ka-uc.a.run.app/api/posts/${slug}`, {
            headers: { "x-site-id": SITE_ID },
          }),
          fetch(`https://cmsapi-pf6diz22ka-uc.a.run.app/api/posts`, {
            headers: { "x-site-id": SITE_ID },
          }),
        ]);
        const postData = await postRes.json();
        const allData = await allRes.json();

        if (postData.success && postData.post) {
          const p = postData.post;
          let toc = [];
          const content = p.content.replace(
            /<h2(.*?)>(.*?)<\/h2>/gi,
            (_, attrs, text) => {
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              toc.push({ id, label: text.replace(/<[^>]+>/g, "").trim() });
              return `<h2 id="${id}"${attrs}>${text}</h2>`;
            }
          );
          setTocLinks(toc);
          setPost({ ...p, content });
        }

        if (allData.success) {
          const others = allData.posts.filter((p) => p.slug !== slug);
          setExplorePosts(others.slice(0, 3));
          setPopularPosts(others.slice(3, 6));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // Active TOC highlight on scroll
  useEffect(() => {
    if (!tocLinks.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveToc(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    tocLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tocLinks]);

  const proseStyles = `
    [&_h2]:text-3xl [&_h2]:font-black [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:text-white [&_h2]:tracking-tight
    [&_p]:text-zinc-400 [&_p]:text-lg [&_p]:leading-[1.8] [&_p]:mb-8
    [&_blockquote]:border-l-4 [&_blockquote]:border-[#FFD600] [&_blockquote]:pl-8 [&_blockquote]:my-12 [&_blockquote]:italic [&_blockquote]:text-2xl [&_blockquote]:text-white
    [&_img]:rounded-[32px] [&_img]:my-12 [&_img]:border [&_img]:border-white/10 [&_img]:w-full [&_img]:object-cover
    [&_strong]:text-white [&_strong]:font-bold
    [&_a]:text-[#FFD600] [&_a]:underline [&_a]:underline-offset-2
    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-zinc-400 [&_ul]:mb-8 [&_ul]:space-y-2
    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-zinc-400 [&_ol]:mb-8 [&_ol]:space-y-2
    [&_code]:bg-zinc-900 [&_code]:text-[#FFD600] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
    [&_pre]:bg-zinc-900 [&_pre]:rounded-2xl [&_pre]:p-6 [&_pre]:mb-8 [&_pre]:overflow-x-auto
  `;

  if (isLoading) {
    return (
      <>
        <style>{`
          @keyframes shimmerSlide {
            0%   { background-position: 100% 0; }
            100% { background-position: -100% 0; }
          }
        `}</style>
        <DetailSkeleton />
      </>
    );
  }

  return (
    <div className="bg-[#050505] text-white selection:bg-[#FFD600]/30 min-h-screen">
      <style>{`
        @keyframes shimmerSlide {
          0%   { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#FFD600] origin-left z-50"
        style={{ scaleX, boxShadow: "0 0 12px #FFD600, 0 0 4px #FFD600" }}
      />

      {/* ── HEADER ── */}
      <header className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-white transition-colors text-sm font-semibold mb-12 group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          Back to all insights
        </Link>

        <div className="flex flex-col items-center">
          <span className="bg-[#FFD600]/10 text-[#FFD600] border border-[#FFD600]/20 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-8">
            {post?.categories?.[0] || "Innovation"}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.05] mb-10"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {post?.title}
          </motion.h1>
          <div className="flex items-center gap-4 text-zinc-600 text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post?.readTime || "6 min read"}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>{post?.authorName || "Team Lurph"}</span>
          </div>
        </div>
      </header>

      {/* ── HERO IMAGE ── */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="aspect-[21/9] rounded-[48px] overflow-hidden border border-white/8 shadow-2xl"
        >
          <img
            src={post?.coverImage || FALLBACK}
            onError={(e) => { e.currentTarget.src = FALLBACK; }}
            className="w-full h-full object-cover"
            alt={post?.title}
          />
        </motion.div>
      </div>

      {/* ── CONTENT GRID ── */}
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-32">

        {/* Left: TOC + Share */}
        <aside className="lg:col-span-3 hidden lg:block sticky top-32 h-fit">
          <div className="flex flex-col gap-10">

            {tocLinks.length > 0 && (
              <div>
                <h5 className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-600 mb-5">
                  In this article
                </h5>
                <div className="flex flex-col gap-3">
                  {tocLinks.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      style={{
                        fontSize: "12.5px",
                        fontWeight: activeToc === link.id ? 700 : 500,
                        color: activeToc === link.id ? "#FFD600" : "rgba(255,255,255,0.35)",
                        textDecoration: "none",
                        transition: "color 0.15s ease",
                        paddingLeft: activeToc === link.id ? "10px" : "0px",
                        borderLeft: activeToc === link.id ? "2px solid #FFD600" : "2px solid transparent",
                        lineHeight: 1.4,
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h5 className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-600 mb-5">
                Share
              </h5>
              <div className="flex gap-2">
                {[
                  { icon: <Twitter size={15} />, onClick: () => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`) },
                  { icon: <Linkedin size={15} />, onClick: () => window.open(`https://linkedin.com/sharing/share-offsite/?url=${window.location.href}`) },
                  {
                    icon: copied ? <Check size={15} /> : <Copy size={15} />,
                    onClick: () => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); },
                  },
                ].map(({ icon, onClick }, i) => (
                  <button
                    key={i}
                    onClick={onClick}
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(255,255,255,0.45)",
                      transition: "all 0.15s ease", cursor: "pointer",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "#FFD600";
                      e.currentTarget.style.color = "#000";
                      e.currentTarget.style.borderColor = "#FFD600";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Middle: Prose */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`lg:col-span-6 ${proseStyles}`}
          dangerouslySetInnerHTML={{ __html: post?.content }}
        />

        {/* Right: Popular */}
        <aside className="lg:col-span-3 hidden lg:block sticky top-32 h-fit">
          <h5 className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-600 mb-7">
            Popular Stories
          </h5>
          <div className="flex flex-col gap-7">
            {popularPosts.map((p) => (
              <Link key={p._id || p.id} to={`/blog/${p.slug}`} className="group block">
                <div className="aspect-video rounded-2xl overflow-hidden mb-3 bg-zinc-900"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <img
                    src={p.coverImage || FALLBACK}
                    onError={(e) => { e.currentTarget.src = FALLBACK; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={p.title}
                  />
                </div>
                <h4
                  className="font-semibold text-[12.5px] leading-snug transition-colors"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#FFD600"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}
                >
                  {p.title}
                </h4>
              </Link>
            ))}
          </div>
        </aside>
      </div>

      {/* ── EXPLORE MORE ── */}
      <section
        style={{
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
        className="py-28 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-[#FFD600] text-[9px] font-black uppercase tracking-widest mb-3 block">
                Recommended
              </span>
              <h2
                className="text-5xl font-black tracking-tight"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                More Insights.
              </h2>
            </div>
            <Link
              to="/blog"
              className="px-7 py-2.5 rounded-full font-bold text-sm hover:bg-white hover:text-black transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
            >
              View All Posts
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {explorePosts.length
              ? explorePosts.map((p) => (
                  <Link key={p._id || p.id} to={`/blog/${p.slug}`} className="group">
                    <div
                      className="aspect-[16/10] rounded-[32px] overflow-hidden mb-5 relative bg-zinc-900"
                      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <img
                        src={p.coverImage || FALLBACK}
                        onError={(e) => { e.currentTarget.src = FALLBACK; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt={p.title}
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
                        style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                      >
                        {p.categories?.[0] || "Article"}
                      </div>
                    </div>
                    <h3
                      className="text-lg font-bold leading-snug transition-colors"
                      style={{ fontFamily: "Syne, sans-serif", color: "rgba(255,255,255,0.8)" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#FFD600"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                    >
                      {p.title}
                    </h3>
                  </Link>
                ))
              : [...Array(3)].map((_, i) => <ExploreShimmer key={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}