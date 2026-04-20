import React, { useState, useEffect } from "react";
import {
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../lurph.png";

const BRAND_YELLOW = "#FFD600";
const SITE_ID = "69c67e3f225219428111ab74";

const XIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.88-7.38L5.62 22H2.5l7.24-8.28L1.2 2h6.4l4.41 6.75L18.9 2zm-1.09 18h1.72L6.67 3.9H4.82L17.81 20z" />
  </svg>
);

// Resilient CMS key lookup (case-insensitive)
const getMenu = (data, menuName) => {
  if (!data) return [];
  const key = Object.keys(data).find(
    (k) => k.toLowerCase() === menuName.toLowerCase(),
  );
  return key ? data[key] : [];
};

// Renders a single footer link — handles internal & external URLs
const FooterLink = ({ link }) => {
  const label = link.label || link.name || "";
  const url = link.url || "#";
  const isExternal = url.startsWith("http");

  const cls =
    "text-sm text-zinc-500 hover:text-white transition-colors duration-200 leading-relaxed";

  return isExternal ? (
    <a href={url} rel="noopener noreferrer" className={cls}>
      {label}
    </a>
  ) : (
    <Link to={url} className={cls}>
      {label}
    </Link>
  );
};

export default function LurphFooter() {
  const [footerData, setFooterData] = useState({});
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          "https://cmsapi-pf6diz22ka-uc.a.run.app/api/menus",
          {
            headers: { "x-site-id": SITE_ID },
          },
        );
        const json = await response.json();
        if (json?.success && json?.data) {
          setFooterData(json.data?.footer || {});
        }
      } catch (error) {
        console.error("CMS API Error:", error);
      }
    };

    fetchMenuData();
  }, []);

  const platformLinks = getMenu(footerData, "Platform");
  const productLinks = getMenu(footerData, "Products");
  const resourceLinks = getMenu(footerData, "Resources");
  const companyLinks = getMenu(footerData, "Company");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ background: "#080808", color: "#fff", fontFamily: "inherit" }}
    >
      {/* ── Background glow + large wordmark ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "520px",
          background: `linear-gradient(to top, rgba(255,214,0,0.07) 0%, transparent 100%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-4%",
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        <span
          style={{
            fontSize: "18vw",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            color: BRAND_YELLOW,
            opacity: 0.055,
            fontFamily: "Syne, sans-serif",
            maskImage:
              "linear-gradient(to bottom, black 30%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 30%, transparent 100%)",
          }}
        >
          Lurph.
        </span>
      </div>

      {/* ── Main content ── */}
      <div
        className="relative z-10 max-w-[1400px] mx-auto"
        style={{ padding: "72px 48px 0 48px" }}
      >
        {/* ── Top bar: logo + socials ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              alt="Lurph"
              style={{ width: 36, height: 36, objectFit: "contain" }}
            />
            <span
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.02em",
                fontFamily: "Syne, sans-serif",
              }}
            >
              Lurph<span style={{ color: BRAND_YELLOW }}>.</span>
            </span>
          </Link>

          {/* Socials */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { Icon: Youtube, href: "https://youtube.com/c/explified" },
              { Icon: Instagram, href: "https://instagram.com/explified" },
              { Icon: XIcon, href: "https://x.com/explified" },
              {
                Icon: Linkedin,
                href: "https://linkedin.com/company/explified",
              },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                rel="noopener noreferrer"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.45)",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = BRAND_YELLOW;
                  e.currentTarget.style.borderColor = BRAND_YELLOW;
                  e.currentTarget.style.color = "#000";
                  e.currentTarget.style.boxShadow = `0 0 18px rgba(255,214,0,0.35)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.07)",
            marginBottom: "52px",
          }}
        />

        {/* ── Link grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr repeat(4, 1fr)",
            gap: "40px",
            marginBottom: "64px",
          }}
          className="grid-footer"
        >
          {/* Newsletter col */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: "16px",
              }}
            >
              Stay in the loop
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.6,
                marginBottom: "20px",
                maxWidth: "220px",
              }}
            >
              Product updates, new tools, and ideas worth reading.
            </p>

            {subscribed ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  background: "rgba(255,214,0,0.1)",
                  border: "1px solid rgba(255,214,0,0.25)",
                  color: BRAND_YELLOW,
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                ✓ You're in!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                style={{ position: "relative", maxWidth: "240px" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    width: "100%",
                    height: "44px",
                    paddingLeft: "18px",
                    paddingRight: "52px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "13px",
                    outline: "none",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(255,214,0,0.4)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
                <button
                  type="submit"
                  style={{
                    position: "absolute",
                    right: "4px",
                    top: "4px",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: BRAND_YELLOW,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.08)";
                    e.currentTarget.style.boxShadow = `0 4px 16px rgba(255,214,0,0.4)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>

          {/* Platform */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: "20px",
              }}
            >
              Platform
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {platformLinks.map((link, i) => (
                <li key={i}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: "20px",
              }}
            >
              Products
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {productLinks.map((link, i) => (
                <li key={i}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: "20px",
              }}
            >
              Resources
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {resourceLinks.map((link, i) => (
                <li key={i}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: "20px",
              }}
            >
              Company
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Responsive grid override */}
      <style>{`
        @media (max-width: 1024px) {
          .grid-footer {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .grid-footer {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
