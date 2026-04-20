import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const POSTS_PER_PAGE = 6;
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
const BRAND_COLOR = "#FFD600";
const SITE_ID = "69c7aac4b4e0d5c00d96e3f2";

/* ─── Shimmer primitives ─── */
const Shimmer = ({ className = "", style = {} }) => (
  <div
    className={className}
    style={{
      background: "linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)",
      backgroundSize: "400% 100%",
      animation: "shimmerSlide 1.6s ease-in-out infinite",
      ...style,
    }}
  />
);

/* ─── Hero shimmer ─── */
const HeroShimmer = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
    {/* Big card */}
    <div className="lg:col-span-8 relative rounded-[40px] overflow-hidden h-[500px]">
      <Shimmer style={{ position: "absolute", inset: 0, borderRadius: "40px" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, padding: "56px", width: "100%" }}>
        <Shimmer style={{ width: "80px", height: "22px", borderRadius: "999px", marginBottom: "20px" }} />
        <Shimmer style={{ width: "65%", height: "52px", borderRadius: "12px", marginBottom: "12px" }} />
        <Shimmer style={{ width: "45%", height: "38px", borderRadius: "12px" }} />
      </div>
    </div>
    {/* Side list */}
    <div className="lg:col-span-4 flex flex-col">
      <Shimmer style={{ width: "120px", height: "12px", borderRadius: "6px", marginBottom: "24px" }} />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 mb-5">
          <Shimmer style={{ width: "96px", height: "80px", borderRadius: "12px", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <Shimmer style={{ width: "90%", height: "14px", borderRadius: "6px", marginBottom: "8px" }} />
            <Shimmer style={{ width: "70%", height: "14px", borderRadius: "6px" }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Grid card shimmer ─── */
const CardShimmer = () => (
  <div>
    <Shimmer style={{ width: "100%", aspectRatio: "16/10", borderRadius: "32px", marginBottom: "24px" }} />
    <Shimmer style={{ width: "90%", height: "22px", borderRadius: "8px", marginBottom: "10px" }} />
    <Shimmer style={{ width: "70%", height: "22px", borderRadius: "8px", marginBottom: "20px" }} />
    <Shimmer style={{ width: "100%", height: "14px", borderRadius: "6px", marginBottom: "8px" }} />
    <Shimmer style={{ width: "80%", height: "14px", borderRadius: "6px", marginBottom: "24px" }} />
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Shimmer style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
      <div>
        <Shimmer style={{ width: "100px", height: "12px", borderRadius: "6px", marginBottom: "6px" }} />
        <Shimmer style={{ width: "70px", height: "10px", borderRadius: "6px" }} />
      </div>
    </div>
  </div>
);

export default function BlogMainPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://cmsapi-pf6diz22ka-uc.a.run.app/api/posts", {
          headers: { "x-site-id": SITE_ID },
        });
        const data = await response.json();
        if (data.success && data.posts) {
          const formatted = data.posts.reverse().map((post) => ({
            id: post._id,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt || "No description available.",
            coverImage: post.coverImage || FALLBACK_IMAGE,
            category: post.categories?.[0] || "General",
            isPinned: post.isPinned || false,
            pinnedOrder: post.pinnedOrder ?? 999,
            author: post.authorName || "Team Lurph",
            readTime: post.readTime || "5 min read",
          }));
          setPosts(formatted);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const pinnedPosts = useMemo(
    () => posts.filter((p) => p.isPinned).sort((a, b) => a.pinnedOrder - b.pinnedOrder),
    [posts]
  );
  const recentPosts = useMemo(() => posts.filter((p) => !p.isPinned), [posts]);

  useEffect(() => {
    if (pinnedPosts.length <= 1) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % pinnedPosts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [pinnedPosts]);

  const activeHero = pinnedPosts[heroIndex] || recentPosts[0];
  const sideList =
    pinnedPosts.length > 1
      ? pinnedPosts.filter((_, i) => i !== heroIndex).slice(0, 5)
      : recentPosts.slice(1, 6);

  const totalPages = Math.ceil(recentPosts.length / POSTS_PER_PAGE);
  const currentRecentPosts = recentPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FFD600]/30">
      {/* Global shimmer keyframe */}
      <style>{`
        @keyframes shimmerSlide {
          0%   { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <main className="max-w-[1400px] mx-auto px-6 pt-32 pb-24">

        {/* ── HERO / PINNED SECTION ── */}
        {isLoading ? (
          <HeroShimmer />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">

            {/* Big hero card */}
            <div className="lg:col-span-8 relative rounded-[40px] overflow-hidden h-[500px] bg-zinc-900 group cursor-pointer">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHero?.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeHero?.coverImage || FALLBACK_IMAGE}
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt="Featured"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-8 lg:p-14 w-full">
                    <motion.span
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-white/10 backdrop-blur-md border border-white/20 mb-6"
                    >
                      {activeHero?.category}
                    </motion.span>
                    <Link to={`/blog/${activeHero?.slug}`}>
                      <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl lg:text-6xl font-bold leading-[1.1] max-w-3xl hover:text-[#FFD600] transition-colors"
                      >
                        {activeHero?.title}
                      </motion.h1>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel dots */}
              {pinnedPosts.length > 1 && (
                <div className="absolute top-8 right-8 flex gap-2">
                  {pinnedPosts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === heroIndex ? "w-8 bg-[#FFD600]" : "w-2 bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Side list */}
            <div className="lg:col-span-4 flex flex-col h-full">
              <h3 className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-6 px-2">
                Featured Posts
              </h3>
              <div className="flex flex-col gap-5 overflow-y-auto no-scrollbar">
                {sideList.map((post) => (
                  <Link
                    to={`/blog/${post.slug}`}
                    key={post.id}
                    className="group flex items-center gap-4 p-2 rounded-2xl hover:bg-white/5 transition-all"
                  >
                    <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-zinc-800">
                      <img
                        src={post.coverImage || FALLBACK_IMAGE}
                        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        alt={post.title}
                      />
                    </div>
                    <h4 className="text-[15px] font-bold leading-tight line-clamp-2 group-hover:text-[#FFD600] transition-colors">
                      {post.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── RECENT POSTS HEADER ── */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold tracking-tight">Recent Posts</h2>
          <button
            onClick={() => {
              setCurrentPage(1);
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/blog");
            }}
            className="px-6 py-2 rounded-full border border-white/10 text-sm font-bold hover:bg-white hover:text-black transition-all"
          >
            All Posts
          </button>
        </div>

        {/* ── GRID ── */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[...Array(6)].map((_, i) => <CardShimmer key={i} />)}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            {currentRecentPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="aspect-[16/10] rounded-[32px] overflow-hidden mb-6 bg-zinc-900">
                    <img
                      src={post.coverImage || FALLBACK_IMAGE}
                      onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={post.title}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-[#FFD600] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 text-[15px] line-clamp-2 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFD600] text-black flex items-center justify-center font-bold text-xs">
                      {post.author[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{post.author}</span>
                      <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── PAGINATION ── */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FFD600] hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-full font-bold transition-all ${
                  currentPage === i + 1
                    ? "bg-[#FFD600] text-black"
                    : "bg-white/5 text-zinc-500 hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FFD600] hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
