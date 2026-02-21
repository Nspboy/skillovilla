import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  const [isScrolled, setIsScrolled] = useState(false);

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
      background: isScrolled ? "rgba(255, 255, 255, 0.98)" : "transparent", 
      backdropFilter: isScrolled ? "blur(12px)" : "none",
      borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      padding: "0 60px", 
      height: "var(--header-height)",
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none"
    }}>
      {/* Logo */}
      <div 
        onClick={() => navigate("/")} 
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
      >
        <div style={{
          width: 38, 
          height: 38, 
          borderRadius: 8,
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
        <span style={{ 
          color: isScrolled ? "var(--dark)" : (location.pathname === "/" ? "#fff" : "var(--dark)"), 
          fontWeight: 800, 
          fontSize: 22, 
          letterSpacing: "-0.5px",
          fontFamily: "'Outfit', sans-serif"
        }}>
          TalentStack
        </span>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: 8 }}>
        {navLinks.map(link => (
          <button 
            key={link.id} 
            onClick={() => navigate(link.path)} 
            style={{
              background: "transparent",
              color: isActive(link.path) 
                ? "var(--primary)" 
                : (isScrolled ? "var(--text-main)" : (location.pathname === "/" ? "#fff" : "var(--text-main)")),
              border: "none", 
              padding: "10px 18px", 
              borderRadius: 8,
              fontSize: 15, 
              paddingInline: "20px",
              fontWeight: isActive(link.path) ? 700 : 500, 
              cursor: "pointer", 
              fontFamily: "inherit",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              if (!isActive(link.path)) {
                e.currentTarget.style.color = "var(--primary)";
              }
            }}
            onMouseLeave={e => {
              if (!isActive(link.path)) {
                e.currentTarget.style.color = isScrolled ? "var(--text-main)" : (location.pathname === "/" ? "#fff" : "var(--text-main)");
              }
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Auth Buttons */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {!isLoggedIn ? (
          <>
            <button 
              onClick={() => navigate("/login")} 
              style={{
                background: "transparent", 
                color: isScrolled ? "var(--text-main)" : (location.pathname === "/" ? "#fff" : "var(--text-main)"), 
                border: "none",
                padding: "10px 20px", 
                fontSize: 15, 
                fontWeight: 600, 
                cursor: "pointer", 
                fontFamily: "inherit"
              }}
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
    </nav>
  );
}
