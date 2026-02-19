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
    <div style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Placement Hall of Fame</h1>
        <p style={{ color: "#64748b", fontSize: 18 }}>Every success story started here</p>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 32 }}>
          {[["92%", "Placement Rate"], ["38L+", "Average Package"], ["300+", "Companies"], ["12K+", "Students Placed"]].map(([val, label]) => (
            <div 
              key={label} 
              style={{
                background: "rgba(255,255,255,0.03)", 
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, 
                padding: "20px 32px", 
                textAlign: "center"
              }}
            >
              <div style={{ color: "#fff", fontSize: 32, fontWeight: 900, fontFamily: "'Playfair Display', serif" }}>{val}</div>
              <div style={{ color: "#64748b", fontSize: 13 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {placements.map((p, i) => (
          <div 
            key={i} 
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20, 
              padding: 28,
              transition: "transform 0.2s"
            }}
          >
            <div style={{
              width: 64, 
              height: 64, 
              borderRadius: 16,
              background: (p.company?.color || "#8b5cf6") + "20",
              border: `2px solid ${(p.company?.color || "#8b5cf6")}40`,
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontSize: 28, 
              fontWeight: 900, 
              color: p.company?.color || "#8b5cf6", 
              marginBottom: 16
            }}>
              {p.company?.logo || p.company?.name?.[0] || "C"}
            </div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>
              {p.student?.name || "Student"}
            </div>
            <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>
              Placed at <span style={{ color: p.company?.color || "#8b5cf6", fontWeight: 600 }}>
                {p.company?.name || "Company"}
              </span>
            </div>
            <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>
              via {p.course?.title || "Course"} program
            </div>
            <div style={{
              display: "inline-block", 
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.3)", 
              color: "#10b981",
              padding: "6px 16px", 
              borderRadius: 100, 
              fontWeight: 800, 
              fontSize: 18
            }}>
              {p.packageLPA}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
