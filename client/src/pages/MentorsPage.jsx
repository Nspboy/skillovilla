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
    <div style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Meet Your Mentors</h1>
        <p style={{ color: "#64748b" }}>Learn from industry veterans who've built products at the world's best companies</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        {mentors.map(m => (
          <div 
            key={m._id} 
            style={{
              background: "rgba(255,255,255,0.03)", 
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 24, 
              padding: 32, 
              display: "flex", 
              gap: 24
            }}
          >
            <div style={{
              width: 80, 
              height: 80, 
              borderRadius: 20,
              background: `linear-gradient(135deg, ${m.color || "#8b5cf6"}, ${m.color || "#8b5cf6"}80)`,
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "#fff", 
              fontSize: 22, 
              fontWeight: 900, 
              flexShrink: 0
            }}>
              {m.initials || "M"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
                    {m.user?.name || m.name}
                  </h3>
                  <p style={{ color: m.color || "#8b5cf6", fontSize: 14, marginBottom: 12, fontWeight: 600 }}>
                    {m.role}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#fbbf24", fontSize: 14 }}>★ {m.rating || 0}</div>
                  <div style={{ color: "#475569", fontSize: 12 }}>{m.totalSessions || 0} sessions</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                {(m.expertise || []).map(e => (
                  <Badge key={e} color={m.color || "#8b5cf6"}>{e}</Badge>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ color: "#64748b", fontSize: 13 }}>🎓 {m.experience} experience</span>
                <button 
                  onClick={() => alert(`Booking session with ${m.user?.name || m.name}...`)}
                  style={{
                    marginLeft: "auto", 
                    background: (m.color || "#8b5cf6") + "20", 
                    color: m.color || "#8b5cf6",
                    border: `1px solid ${(m.color || "#8b5cf6")}40`, 
                    padding: "8px 18px", 
                    borderRadius: 10,
                    fontSize: 13, 
                    fontWeight: 600, 
                    cursor: "pointer", 
                    fontFamily: "inherit"
                  }}>
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
