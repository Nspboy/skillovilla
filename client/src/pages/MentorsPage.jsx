import { useState, useEffect } from 'react';
import Badge from '../components/Badge';
import { mentorsAPI } from '../services/api';

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    mentorsAPI.getAll().then(res => {
      setMentors(res.data.data.mentors || []);
    }).catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "120px 60px", maxWidth: 1200, margin: "0 auto", background: "#fff", paddingTop: "var(--header-height)" }}>
      <div style={{ marginBottom: 60, textAlign: "center" }}>
        <Badge text="Expert Mentorship" color="var(--primary)" />
        <h1 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 900, color: "var(--dark)", marginBottom: 20, letterSpacing: "-1.5px" }}>Meet Your Mentors</h1>
        <p style={{ color: "var(--text-sub)", fontSize: 18, maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>Learn from industry veterans who've built products at the world's best companies and are dedicated to your success.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))", gap: 32 }}>
        {mentors.map(m => (
          <div 
            key={m._id} 
            style={{
              background: "#fff", 
              border: "1px solid #E2E8F0",
              borderRadius: 32, 
              padding: 40, 
              display: "flex", 
              gap: 32,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 86, 210, 0.1)";
              e.currentTarget.style.borderColor = "var(--primary)40";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)";
              e.currentTarget.style.borderColor = "#E2E8F0";
            }}
          >
            <div style={{
              width: 100, 
              height: 100, 
              borderRadius: 24,
              overflow: "hidden",
              background: `linear-gradient(135deg, ${m.color || "#8b5cf6"}15, ${m.color || "#8b5cf6"}05)`,
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              flexShrink: 0
            }}>
              <img src={m.user?.avatar || `https://ui-avatars.com/api/?name=${m.user?.name || m.name}&background=random`} alt={m.user?.name || m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <h3 style={{ color: "var(--dark)", fontWeight: 800, fontSize: 22, marginBottom: 4, letterSpacing: "-0.5px" }}>
                    {m.user?.name || m.name}
                  </h3>
                  <p style={{ color: "var(--primary)", fontSize: 16, fontWeight: 700 }}>
                    {m.role}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#F59E0B", fontSize: 16, fontWeight: 800 }}>★ {m.rating || 0}</div>
                  <div style={{ color: "var(--text-sub)", fontSize: 13, fontWeight: 600 }}>{m.totalSessions || 0} sessions</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                {(m.expertise || []).map(e => (
                  <Badge key={e} color="var(--text-sub)" style={{ marginBottom: 0, textTransform: "none", fontSize: 12 }}>{e}</Badge>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", paddingTop: 20, borderTop: "1px solid #F1F5F9" }}>
                <span style={{ color: "var(--text-sub)", fontSize: 14, fontWeight: 600 }}>🎓 {m.experience} experience</span>
                <button 
                  onClick={() => alert(`Booking session with ${m.user?.name || m.name}...`)}
                  style={{
                    marginLeft: "auto", 
                    background: "var(--primary)", 
                    color: "#fff",
                    border: "none", 
                    padding: "12px 24px", 
                    borderRadius: 12,
                    fontSize: 14, 
                    fontWeight: 700, 
                    cursor: "pointer", 
                    transition: "all 0.2s",
                    boxShadow: "0 4px 12px rgba(0, 86, 210, 0.2)"
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  Book Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
