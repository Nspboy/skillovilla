import { useState, useEffect } from 'react';
import { placementsAPI } from '../services/api';

export default function PlacementsPage() {
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    placementsAPI.getAll().then(res => {
      setPlacements(res.data.data.placements || []);
    }).catch(err => console.error(err));
  }, []);

  return (
    <div style={{ background: "#050505", minHeight: "100vh" }}>
      <div className="main-container" style={{ padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 100 }} className="reveal-up">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 900, color: "#fff", marginBottom: 24, letterSpacing: "-2px" }}>
            Placement Hall of <span style={{ color: "var(--primary)" }}>Fame</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 22, fontWeight: 500, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Celebrating the journey of our students who are now leading the tech revolution at top global brands.
          </p>
          
          <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 64, flexWrap: "wrap" }}>
            {[["92%", "Placement Rate"], ["38L+", "Average Package"], ["300+", "Companies"], ["12K+", "Students Placed"]].map(([val, label]) => (
              <div 
                key={label} 
                className="glass-card-premium-dark"
                style={{
                  borderRadius: 32, 
                  padding: "40px 48px", 
                  textAlign: "center",
                  flex: "1 1 200px",
                  maxWidth: 280,
                  border: "1px solid rgba(255,255,255,0.05)"
                }}
              >
                <div style={{ color: "var(--primary)", fontSize: 44, fontWeight: 900, fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>{val}</div>
                <div style={{ color: "#64748b", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="responsive-grid-3" style={{ gap: 40 }}>
          {placements.map((p, i) => (
            <div 
              key={i} 
              className="glass-card-premium-dark hover-lift-dark reveal-up"
              style={{
                padding: "48px 40px",
                borderRadius: 48,
                animationDelay: `${i * 0.1}s`,
                background: "rgba(15, 15, 20, 0.4)",
                border: "1px solid rgba(255,255,255,0.03)"
              }}
            >
              {/* Subtle inner glow */}
              <div style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                background: `radial-gradient(circle at 20% 0%, ${p.company?.color || "var(--primary)"}08, transparent 50%)`,
                pointerEvents: "none"
              }} />

              <div style={{
                width: 100, 
                height: 40, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "flex-start",
                marginBottom: 40,
                position: "relative"
              }}>
                {p.company?.logo ? (
                  <img 
                    src={p.company.logo} 
                    alt={p.company.name} 
                    className="animate-logo-float card-logo-hover-target"
                    style={{ height: "100%", width: "auto", maxWidth: "160px", objectFit: "contain", filter: "brightness(0) invert(1) opacity(0.8)" }} 
                  />
                ) : (
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", opacity: 0.9 }}>
                    {p.company?.name || "Company"}
                  </div>
                )}
              </div>
              
              <div style={{ color: "#fff", fontWeight: 900, fontSize: 26, marginBottom: 12, letterSpacing: "-0.5px" }}>
                {p.student?.name || "Student"}
              </div>
              
              <div style={{ color: "#94a3b8", fontSize: 17, marginBottom: 8, fontWeight: 500 }}>
                Placed at <span style={{ color: "#fff", fontWeight: 700 }}>
                  {p.company?.name || "Company"}
                </span>
              </div>
              
              <div style={{ color: "#64748b", fontSize: 14, marginBottom: 40, fontWeight: 600 }}>
                via {p.course?.title || "Course"} program
              </div>
              
              <div style={{
                display: "inline-flex", 
                alignItems: "center",
                background: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)",
                border: "1px solid rgba(16,185,129,0.2)", 
                color: "#10b981",
                padding: "12px 28px", 
                borderRadius: 100, 
                fontWeight: 900, 
                fontSize: 22,
                boxShadow: "0 10px 20px rgba(16,185,129,0.1)"
              }}>
                {p.packageLPA}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
