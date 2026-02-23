import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const navLinks = [
    { id: "courses", label: "Programs", path: "/courses" },
    { id: "mentors", label: "Mentors", path: "/mentors" },
    { id: "placements", label: "Placements", path: "/placements" },
    { 
      id: "resources", 
      label: "Resources", 
      path: "#",
      children: [
        { label: "Community", path: "/community", icon: "🤝" },
        { label: "Blog & Insights", path: "/blogs", icon: "✍️" },
        { label: "Masterclasses", path: "/masterclasses", icon: "📺" },
        { label: "Scholarships", path: "/scholarship", icon: "🎓" },
        { label: "About Us", path: "/about", icon: "✨" },
      ]
    },
  ];

  const isActive = (path) => path !== "#" && location.pathname === path;

  // ... previous component logic remains ...

  return (
    <nav style={{
      position: "fixed", 
      top: 0, 
      left: 0,
      right: 0,
      zIndex: 1000,
      background: isScrolled ? "rgba(255, 255, 255, 0.85)" : "transparent", 
      WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
      backdropFilter: isScrolled ? "blur(20px)" : "none",
      borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.3)" : "none",
      height: isScrolled ? "70px" : "var(--header-height)",
      display: "flex", 
      alignItems: "center",
      transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      boxShadow: isScrolled ? "0 10px 30px -10px rgba(0,0,0,0.05)" : "none"
    }}>
      <div className={`mobile-overlay ${isMobileMenuOpen ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      
      <div className={`mobile-drawer ${isMobileMenuOpen ? "active" : ""}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <span style={{ fontWeight: 800, fontSize: 20 }}>Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: "transparent", border: "none", fontSize: 24, cursor: "pointer" }}>✕</button>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {navLinks.map(link => (
            <div key={link.id}>
              <button 
                onClick={() => { if(!link.children) { navigate(link.path); setIsMobileMenuOpen(false); } }} 
                style={{
                  width: "100%",
                  background: "transparent",
                  color: isActive(link.path) ? "var(--primary)" : "var(--dark)",
                  border: "none", 
                  padding: "15px 0", 
                  fontSize: 17, 
                  fontWeight: 700, 
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                {link.label}
                {link.children && <span>⌄</span>}
              </button>
              {link.children && (
                <div style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10, marginBottom: 15 }}>
                  {link.children.map(child => (
                    <button 
                      key={child.path}
                      onClick={() => { navigate(child.path); setIsMobileMenuOpen(false); }}
                      style={{ background: "transparent", border: "none", textAlign: "left", color: "var(--text-sub)", fontSize: 15, fontWeight: 600 }}
                    >
                      {child.icon} {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
          <button onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }} style={{ padding: "14px", borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff", fontWeight: 700 }}>Login</button>
          <button onClick={() => { navigate("/signup"); setIsMobileMenuOpen(false); }} style={{ padding: "14px", borderRadius: 12, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 700 }}>Get Started</button>
        </div>
      </div>

      <div className="main-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {/* Logo */}
      <div 
        onClick={() => navigate("/")} 
        style={{ 
          cursor: "pointer", 
          display: "flex", 
          alignItems: "center", 
          gap: 12,
          transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.05)";
          const icon = e.currentTarget.querySelector(".logo-icon");
          if (icon) icon.style.transform = "rotate(12deg) scale(1.1)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
          const icon = e.currentTarget.querySelector(".logo-icon");
          if (icon) icon.style.transform = "rotate(0deg) scale(1)";
        }}
      >
        <div 
          className="logo-icon"
          style={{
            width: 40, 
            height: 40, 
            borderRadius: 10,
            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            color: "#fff", 
            fontWeight: 900, 
            fontSize: 22,
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: "0 8px 16px rgba(139, 92, 246, 0.2)"
          }}
        >
          T
        </div>
        <span style={{ 
          color: (isScrolled ? "var(--dark)" : (location.pathname === "/" ? "var(--dark)" : "var(--text-main)")), 
          fontWeight: 800, 
          fontSize: 24, 
          letterSpacing: "-0.8px",
          fontFamily: "'Outfit', sans-serif",
          transition: "color 0.3s ease"
        }}>
          TalentStack
        </span>
      </div>

      {/* Nav Links - Desktop */}
      <div className="nav-desktop-links" style={{ display: "flex", gap: "5px" }}>
        {navLinks.map(link => (
          <div 
            key={link.id} 
            onMouseEnter={() => link.children && setActiveDropdown(link.id)}
            onMouseLeave={() => setActiveDropdown(null)}
            style={{ position: "relative" }}
          >
            <button 
              onClick={() => !link.children && navigate(link.path)} 
              style={{
                background: "transparent",
                color: (isActive(link.path) || activeDropdown === link.id)
                  ? "var(--primary)" 
                  : (isScrolled ? "var(--text-main)" : (location.pathname === "/" ? "var(--dark)" : "var(--text-main)")),
                border: "none", 
                padding: "10px 18px", 
                borderRadius: "12px",
                fontSize: "15px", 
                fontWeight: (isActive(link.path) || activeDropdown === link.id) ? 700 : 600, 
                cursor: "pointer", 
                fontFamily: "inherit",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              {link.label}
              {link.children && (
                <span style={{ 
                  fontSize: 10, 
                  transition: "transform 0.3s", 
                  transform: activeDropdown === link.id ? "rotate(180deg)" : "rotate(0deg)" 
                }}>
                  ▼
                </span>
              )}
              {isActive(link.path) && (
                <span style={{
                  position: "absolute",
                  bottom: "8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "var(--primary)"
                }} />
              )}
            </button>

            {/* Dropdown Menu */}
            {link.children && activeDropdown === link.id && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                paddingTop: 10,
                animation: "reveal-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
              }}>
                <div style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: 12,
                  boxShadow: "0 20px 40px rgba(15, 23, 42, 0.15)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  minWidth: 220,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4
                }}>
                  {link.children.map(child => (
                    <button 
                      key={child.path}
                      onClick={() => navigate(child.path)}
                      style={{
                        padding: "12px 16px",
                        borderRadius: 12,
                        background: "transparent",
                        border: "none",
                        color: "var(--text-main)",
                        fontSize: "14px",
                        fontWeight: 600,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        gap: 12
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(139, 92, 246, 0.05)";
                        e.currentTarget.style.color = "var(--primary)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--text-main)";
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{child.icon}</span>
                      {child.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Auth Buttons - Desktop */}
      <div className="nav-desktop-links" style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {!isLoggedIn ? (
          <>
            <button 
              onClick={() => navigate("/login")} 
              style={{
                background: "transparent", 
                color: isScrolled ? "var(--text-main)" : (location.pathname === "/" ? "var(--dark)" : "var(--text-main)"), 
                border: "none",
                padding: "10px 20px", 
                fontSize: 15, 
                fontWeight: 600, 
                cursor: "pointer", 
                fontFamily: "inherit",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
              onMouseLeave={e => e.currentTarget.style.color = isScrolled ? "var(--text-main)" : (location.pathname === "/" ? "var(--dark)" : "var(--text-main)")}
            >
              Login
            </button>
            <button 
              onClick={() => navigate("/signup")} 
              style={{
                background: "var(--primary)", 
                color: "#fff",
                border: "none", 
                padding: "10px 24px", 
                borderRadius: 8, 
                fontSize: 15, 
                fontWeight: 700,
                cursor: "pointer", 
                fontFamily: "inherit", 
                boxShadow: "0 4px 14px rgba(0, 86, 210, 0.2)"
              }}
            >
              Get Started
            </button>
          </>
        ) : (
          <button 
            onClick={() => navigate("/dashboard")} 
            style={{
              background: "rgba(0, 86, 210, 0.08)", 
              color: "var(--primary)", 
              border: "1px solid rgba(0, 86, 210, 0.2)",
              padding: "8px 18px", 
              borderRadius: 8, 
              fontSize: 14, 
              fontWeight: 600, 
              cursor: "pointer", 
              fontFamily: "inherit"
            }}
          >
            Dashboard
          </button>
        )}
        </div>

        {/* Hamburger for Mobile */}
        <button className="hamburger" onClick={() => setIsMobileMenuOpen(true)}>
          <span style={{ background: "var(--dark)" }}></span>
          <span style={{ background: "var(--dark)" }}></span>
          <span style={{ background: "var(--dark)" }}></span>
        </button>
      </div>
    </nav>
  );
}
