import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMedia, setActiveMedia] = useState(null);

  const PREVIEW_MEDIA = {
    "Data Science": "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=800&auto=format&fit=crop",
    "Business Analytics": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    "Product Management": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    "Digital Marketing": "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c20a?q=80&w=800&auto=format&fit=crop",
    "Our Story": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    "Blog": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop",
    "Community": "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop",
    "Masterclasses": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    "Scholarship": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
  };

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLinkClick = (link) => {
    const routeMap = {
      "Data Science": "/courses",
      "Business Analytics": "/courses",
      "Product Management": "/courses",
      "Digital Marketing": "/courses",
      "Our Story": "/about",
      "Success Stories": "/placements",
      "Hiring Partners": "/placements",
      "Careers": "/about",
      "Blog": "/blogs",
      "Masterclasses": "/masterclasses",
      "Scholarship": "/scholarship",
      "Community": "/community",
    };

    if (routeMap[link]) {
      navigate(routeMap[link]);
    } else {
      // Fallback to section scrolling if no direct route
      const sectionMap = {
        "Success Stories": "alumni",
      };
      if (sectionMap[link]) scrollToSection(sectionMap[link]);
    }

    // Trigger Media Preview
    if (PREVIEW_MEDIA[link]) {
      setActiveMedia({ title: link, url: PREVIEW_MEDIA[link] });
      setTimeout(() => setActiveMedia(null), 4000);
    }
  };

  return (
    <footer style={{
      background: "#0F172A", 
      color: "#94A3B8",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "clamp(60px, 10vw, 100px) var(--container-padding) 40px",
      position: "relative"
    }}>
      {/* Dynamic Media Preview Popup */}
      {activeMedia && (
        <div style={{
          position: "fixed",
          bottom: "clamp(20px, 5vw, 40px)",
          right: "clamp(20px, 5vw, 40px)",
          width: "calc(100vw - 40px)",
          maxWidth: 320,
          background: "white",
          borderRadius: 24,
          padding: 12,
          boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
          zIndex: 3000,
          animation: "reveal-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: "0 8px" }}>
            <span style={{ fontWeight: 800, fontSize: 13, color: "var(--dark)", textTransform: "uppercase", letterSpacing: 1 }}>{activeMedia.title} Preview</span>
            <button onClick={() => setActiveMedia(null)} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>
          <img src={activeMedia.url} alt="" style={{ width: "100%", height: 180, borderRadius: 16, objectFit: "cover" }} />
          <div style={{ padding: 12, fontSize: 13, color: "var(--text-sub)", fontWeight: 500 }}>
            Click to learn more about our high-impact {activeMedia.title.toLowerCase()} curriculum.
          </div>
        </div>
      )}

      <div className="main-container">
        <div className="footer-grid" style={{ marginBottom: 60 }}>
          {/* Brand Col */}
          <div style={{ paddingRight: "clamp(0px, 4vw, 40px)" }}>
            <div 
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <div style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 10, 
                background: "linear-gradient(135deg, var(--primary), var(--secondary))", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                color: "#fff", 
                fontWeight: 900,
                fontSize: 20
              }}>
                T
              </div>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 22, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.5px" }}>TalentStack</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 30, color: "#94A3B8" }}>
              The career accelerator for the next generation of tech talent. Learn from the top 1% and land roles at the world's most innovative companies.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["L", "Y", "I", "D"].map((social, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    width: 42, 
                    height: 42, 
                    borderRadius: 12, 
                    background: "rgba(255,255,255,0.06)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(255,255,255,0.05)"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "var(--primary)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(139, 92, 246, 0.3)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ color: "#fff", fontSize: 14, fontWeight: 900 }}>{social}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          {[
            { title: "Tracks", links: ["Data Science", "Business Analytics", "Product Management", "Digital Marketing"] },
            { title: "About Us", links: ["Our Story", "Success Stories", "Hiring Partners", "Careers"] },
            { title: "Resources", links: ["Blog", "Masterclasses", "Scholarship", "Community"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 28, fontFamily: "'Outfit', sans-serif" }}>
                {col.title}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {col.links.map(link => (
                  <div 
                    key={link} 
                    onClick={() => handleLinkClick(link)}
                    style={{ 
                      fontSize: 15, 
                      cursor: "pointer", 
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)", 
                      color: "#94A3B8",
                      display: "flex",
                      alignItems: "center",
                      gap: 0
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.gap = "8px";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "#94A3B8";
                      e.currentTarget.style.gap = "0";
                    }}
                  >
                    <div style={{ width: 0, height: 1, background: "var(--primary)", transition: "width 0.3s" }} className="hover-line" />
                    {link}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Newsletter */}
          <div className="footer-newsletter-col" style={{ background: "rgba(255,255,255,0.03)", padding: 24, borderRadius: 20, border: "1px solid rgba(255,255,255,0.05)" }}>
            <h4 style={{ color: "#fff", fontSize: 17, fontWeight: 700, marginBottom: 16, fontFamily: "'Outfit', sans-serif" }}>Stay Updated</h4>
            <p style={{ fontSize: 14, color: "#94A3B8", marginBottom: 20, lineHeight: 1.6 }}>Subscribe to get the latest career tips and exclusive track discounts.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input 
                placeholder="Email Address" 
                style={{ 
                  background: "rgba(255,255,255,0.05)", 
                  border: "1px solid rgba(255,255,255,0.1)", 
                  borderRadius: 10, 
                  padding: "12px 16px", 
                  color: "#fff", 
                  fontSize: 14, 
                  width: "100%",
                  outline: "none",
                  transition: "all 0.3s ease"
                }} 
                onFocus={e => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              />
              <button 
                className="shimmer-btn"
                style={{ 
                  background: "var(--primary)", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: 10, 
                  padding: "12px 20px", 
                  fontWeight: 700, 
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 10px 20px rgba(139, 92, 246, 0.2)"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                Join Newsletter
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ 
          borderTop: "1px solid rgba(255,255,255,0.05)", 
          paddingTop: 32, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          fontSize: 13
        }}>
          <span>
            © 2026 TalentStack. Made with ❤️ for the next generation of talent.
          </span>
          <div style={{ display: "flex", gap: "clamp(12px, 3vw, 24px)", flexWrap: "wrap", justifyContent: "center" }}>
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(item => (
              <span 
                key={item} 
                style={{ cursor: "pointer", transition: "color 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
                onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
