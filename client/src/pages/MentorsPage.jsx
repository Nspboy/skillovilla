import { useState, useEffect } from 'react';
import Badge from '../components/Badge';
import { mentorsAPI } from '../services/api';

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => {
    mentorsAPI.getAll().then(res => {
      setMentors(res.data.data.mentors || []);
    }).catch(err => console.error(err));
  }, []);

  const handleBookSession = (mentor) => {
    setSelectedMentor(mentor);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  return (
    <div style={{ padding: "120px 60px", minHeight: "100vh", background: "#0F172A", paddingTop: "var(--header-height)", position: "relative" }}>
      <div className="bg-mesh-grid" style={{ opacity: 0.3 }} />
      <div style={{ marginBottom: 80, textAlign: "center", position: "relative", zIndex: 1 }}>
        <Badge text="Elite Mentorship" color="#fff" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }} />
        <h1 style={{ fontSize: "clamp(3rem, 5vw, 4rem)", fontWeight: 900, color: "#fff", marginBottom: 24, letterSpacing: "-2px" }}>Learn from the best.</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, maxWidth: 700, margin: "0 auto", lineHeight: 1.6, fontWeight: 500 }}>
          Our mentors lead teams at top-tier companies. Get personalized guidance to accelerate your career.
        </p>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: 32, position: "relative", zIndex: 1 }}>
        {mentors.map((m, i) => (
          <div 
            key={m._id} 
            className="hover-lift-dark reveal-up"
            style={{
              background: "rgba(20, 20, 25, 0.4)", 
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: 48, 
              padding: "48px 40px", 
              textAlign: "center",
              display: "flex", 
              flexDirection: "column",
              alignItems: "center",
              animationDelay: `${i * 0.1}s`
            }}
          >
            <div style={{ position: "relative", marginBottom: 32 }}>
              <div style={{
                width: 140, 
                height: 140, 
                borderRadius: "50%",
                padding: 4,
                background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                flexShrink: 0
              }}>
                <img 
                  src={m.user?.avatar || `https://ui-avatars.com/api/?name=${m.user?.name || m.name}&background=random`} 
                  alt={m.user?.name || m.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", border: "4px solid #0F172A" }} 
                />
              </div>
              {/* Brand/Company Badge */}
              <div 
                className="floating-badge animate-logo-float"
                style={{
                  position: "absolute",
                  bottom: -5,
                  right: -15,
                  background: "#fff",
                  padding: "8px 16px",
                  borderRadius: 24,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  border: "1px solid rgba(255,255,255,0.1)"
                }}
              >
                <img 
                  src={m.experience?.split(" ")[0] === "Google" 
                    ? "https://www.vectorlogo.zone/logos/google/google-icon.svg" 
                    : "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg"
                  } 
                  alt="Company Logo" 
                  style={{ height: 18, width: "auto" }} 
                />
                <span style={{ 
                  fontSize: 13, 
                  fontWeight: 900, 
                  color: "#0F172A", 
                  marginLeft: 8,
                  letterSpacing: "-0.3px"
                }}>
                  {m.experience?.split(" ")[0] === "Google" ? "Google" : "Microsoft"}
                </span>
              </div>
            </div>

            <h3 style={{ color: "#fff", fontWeight: 900, fontSize: 32, marginBottom: 8, letterSpacing: "-1px" }}>
              {m.user?.name || m.name}
            </h3>
            <p style={{ color: "var(--primary)", fontSize: 14, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, marginBottom: 24 }}>
              {m.role || "Senior Software Engineer"}
            </p>

            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7, marginBottom: 32, maxWidth: 300 }}>
              {m.name} leads specialized teams at top tech firms, building scalable systems used by millions worldwide.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
              {["System Design", "Cloud Architecture", "Distributed Systems"].map(e => (
                <div 
                  key={e} 
                  className="hover-scale"
                  style={{ 
                    background: "rgba(255,255,255,0.06)", 
                    color: "rgba(255,255,255,0.8)", 
                    padding: "8px 20px",
                    borderRadius: 100,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "default",
                    border: "1px solid rgba(255,255,255,0.03)"
                  }}
                >
                  {e}
                </div>
              ))}
            </div>

            <div style={{ marginTop: "auto", width: "100%" }}>
              <button 
                onClick={() => handleBookSession(m)}
                className="btn-pulse-hover shimmer-btn"
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, var(--primary), var(--secondary))", 
                  color: "#fff",
                  border: "none", 
                  padding: "18px 32px", 
                  borderRadius: 100,
                  fontSize: 16, 
                  fontWeight: 800, 
                  cursor: "pointer", 
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 15px 30px rgba(139, 92, 246, 0.3)"
                }}
              >
                Book a Session
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Central Booking Notification */}
      {showNotification && selectedMentor && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          color: "var(--dark)",
          padding: "40px 60px",
          borderRadius: 40,
          boxShadow: "0 50px 100px rgba(0,0,0,0.8)",
          zIndex: 9999,
          textAlign: "center",
          animation: "reveal-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          minWidth: 400
        }}>
          <div style={{ fontSize: 64, marginBottom: 24, animation: "logo-float 2s infinite ease-in-out" }}>📅</div>
          <h3 style={{ fontWeight: 900, marginBottom: 12, fontSize: 32, letterSpacing: "-1px" }}>Session Requested!</h3>
          <p style={{ color: "var(--text-sub)", fontWeight: 600, fontSize: 18, marginBottom: 8 }}>You've successfully requested a session with</p>
          <div style={{ fontWeight: 900, color: "var(--primary)", fontSize: 24, marginBottom: 32 }}>{selectedMentor.user?.name || selectedMentor.name}</div>
          <button 
            onClick={() => setShowNotification(false)}
            style={{ 
              padding: "16px 48px", 
              background: "var(--primary)", 
              color: "#fff", 
              border: "none", 
              borderRadius: 100, 
              fontWeight: 800, 
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(139, 92, 246, 0.3)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Awesome!
          </button>
        </div>
      )}
    </div>
  );
}
