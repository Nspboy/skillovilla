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

  const navLinks = [
    { id: "courses", label: "Courses", path: "/courses" },
    { id: "upskill", label: "Upskill", path: "/courses?category=Business" },
    { id: "hire", label: "Hire From Us", path: "/placements" },
    { id: "success", label: "Success Stories", path: "/placements" },
  ];

  const isActive = (path) => location.pathname === path;

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
        
        {navLinks.map(link => (
          <button 
            key={link.id} 
            onClick={() => { navigate(link.path); setIsMobileMenuOpen(false); }} 
            style={{
              background: "transparent",
              color: isActive(link.path) ? "var(--primary)" : "var(--dark)",
              border: "none", 
              padding: "15px 0", 
              fontSize: 18, 
              fontWeight: 700, 
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #f1f5f9"
            }}
          >
            {link.label}
          </button>
        ))}
        
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
          color: "var(--dark)", 
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
      <div className="nav-desktop-links" style={{ display: "flex", gap: "10px" }}>
        {navLinks.map(link => (
          <button 
            key={link.id} 
            onClick={() => navigate(link.path)} 
            style={{
              background: "transparent",
              color: isActive(link.path) 
                ? "var(--primary)" 
                : (isScrolled ? "var(--text-main)" : (location.pathname === "/" ? "var(--dark)" : "var(--text-main)")),
              border: "none", 
              padding: "10px 18px", 
              borderRadius: "12px",
              fontSize: "15px", 
              fontWeight: isActive(link.path) ? 700 : 600, 
              cursor: "pointer", 
              fontFamily: "inherit",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={e => {
              if (!isActive(link.path)) {
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.05)";
                e.currentTarget.style.color = "var(--primary)";
              }
            }}
            onMouseLeave={e => {
              if (!isActive(link.path)) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = isScrolled ? "var(--text-main)" : (location.pathname === "/" ? "var(--dark)" : "var(--text-main)");
              }
            }}
          >
            {link.label}
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
