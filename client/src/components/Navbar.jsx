import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "courses", label: "Programs", path: "/courses" },
    { id: "mentors", label: "Mentors", path: "/mentors" },
    { id: "placements", label: "Placements", path: "/placements" },
    { id: "blogs", label: "Blog", path: "/blogs" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: "sticky", 
      top: 0, 
      zIndex: 100,
      background: "rgba(10,10,15,0.85)", 
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "0 24px", 
      height: 64,
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between"
    }}>
      {/* Logo */}
      <div 
        onClick={() => navigate("/")} 
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
      >
        <div style={{
          width: 36, 
          height: 36, 
          borderRadius: 10,
          background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          color: "#fff", 
          fontWeight: 900, 
          fontSize: 18
        }}>
          T
        </div>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>
          Talent<span style={{ 
            background: "linear-gradient(135deg, #f97316, #fbbf24)", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent" 
          }}>
            Stack
          </span>
        </span>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: 4 }}>
        {navLinks.map(link => (
          <button 
            key={link.id} 
            onClick={() => navigate(link.path)} 
            style={{
              background: isActive(link.path) ? "rgba(139,92,246,0.15)" : "transparent",
              color: isActive(link.path) ? "#c4b5fd" : "#94a3b8",
              border: "none", 
              padding: "8px 16px", 
              borderRadius: 10,
              fontSize: 14, 
              fontWeight: 600, 
              cursor: "pointer", 
              fontFamily: "inherit",
              transition: "all 0.2s"
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Auth Buttons */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button 
          onClick={() => navigate("/login")} 
          style={{
            background: "transparent", 
            color: "#94a3b8", 
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "8px 18px", 
            borderRadius: 10, 
            fontSize: 14, 
            fontWeight: 600, 
            cursor: "pointer", 
            fontFamily: "inherit"
          }}
        >
          Sign In
        </button>
        <button 
          onClick={() => navigate("/signup")} 
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", 
            color: "#fff",
            border: "none", 
            padding: "8px 18px", 
            borderRadius: 10, 
            fontSize: 14, 
            fontWeight: 700,
            cursor: "pointer", 
            fontFamily: "inherit", 
            boxShadow: "0 4px 16px rgba(139,92,246,0.3)"
          }}
        >
          Get Started
        </button>
        <button 
          onClick={() => navigate("/dashboard")} 
          style={{
            background: "rgba(249,115,22,0.15)", 
            color: "#f97316", 
            border: "1px solid rgba(249,115,22,0.3)",
            padding: "8px 14px", 
            borderRadius: 10, 
            fontSize: 13, 
            fontWeight: 600, 
            cursor: "pointer", 
            fontFamily: "inherit"
          }}
        >
          Dashboard
        </button>
      </div>
    </nav>
  );
}
