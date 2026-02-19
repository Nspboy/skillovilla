import { useState, useEffect } from 'react';
import { sessionsAPI } from '../services/api';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    sessionsAPI.getDashboard().then(res => {
      setDashboardData(res.data.data);
    }).catch(err => {
      console.error(err);
    });
  }, []);

  const navItems = [
    { id: "overview", icon: "🏠", label: "Overview" },
    { id: "courses", icon: "📚", label: "My Courses" },
    { id: "sessions", icon: "📺", label: "Live Sessions" },
    { id: "mentors", icon: "👤", label: "My Mentors" },
    { id: "certificates", icon: "🏆", label: "Certificates" },
  ];

  const enrollments = dashboardData?.enrollments || [];
  const stats = dashboardData?.stats || {};

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
      {/* Sidebar */}
      <div style={{
        width: 240, 
        background: "#070709", 
        borderRight: "1px solid rgba(255,255,255,0.07)",
        padding: "32px 0", 
        flexShrink: 0
      }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 16 }}>
          <div style={{ 
            width: 48, 
            height: 48, 
            borderRadius: 14, 
            background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            color: "#fff", 
            fontWeight: 800, 
            fontSize: 18, 
            marginBottom: 10 
          }}>
            S
          </div>
          <div style={{ color: "#fff", fontWeight: 700 }}>Student Name</div>
          <div style={{ color: "#64748b", fontSize: 13 }}>Full Stack Program</div>
        </div>
        {navItems.map(item => (
          <button 
            key={item.id} 
            onClick={() => setActiveSection(item.id)} 
            style={{
              width: "100%", 
              background: activeSection === item.id ? "rgba(139,92,246,0.15)" : "transparent",
              border: "none", 
              borderLeft: `3px solid ${activeSection === item.id ? "#8b5cf6" : "transparent"}`,
              color: activeSection === item.id ? "#c4b5fd" : "#64748b",
              padding: "12px 20px", 
              textAlign: "left", 
              fontSize: 14, 
              fontWeight: 600,
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: 10, 
              fontFamily: "inherit"
            }}
          >
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "32px 40px", overflowY: "auto" }}>
        {activeSection === "overview" && (
          <div>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Good morning! 👋</h2>
            <p style={{ color: "#64748b", marginBottom: 32 }}>You're on track. Keep going!</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
              {[
                { icon: "📚", label: "Enrolled Courses", val: stats.enrolledCount || 0, color: "#8b5cf6" },
                { icon: "⏱", label: "Hours Learned", val: stats.hoursLearned || 0, color: "#f97316" },
                { icon: "🎯", label: "Sessions Attended", val: stats.sessionsAttended || 0, color: "#06b6d4" },
                { icon: "🏆", label: "Certificates", val: stats.certificateCount || 0, color: "#10b981" },
              ].map(stat => (
                <div 
                  key={stat.label} 
                  style={{
                    background: "rgba(255,255,255,0.03)", 
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16, 
                    padding: 20
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
                  <div style={{ color: "#fff", fontSize: 28, fontWeight: 900 }}>{stat.val}</div>
                  <div style={{ color: "#64748b", fontSize: 12 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Course Progress</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {enrollments.map((enrollment, i) => {
                const course = enrollment.course;
                const progress = enrollment.progress || 0;
                return (
                  <div 
                    key={enrollment._id} 
                    style={{
                      background: "rgba(255,255,255,0.03)", 
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 16, 
                      padding: 20, 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 20
                    }}
                  >
                    <div style={{ fontSize: 32 }}>{course?.icon || "📚"}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#fff", fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                        {course?.title || "Course"}
                      </div>
                      <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, marginBottom: 4 }}>
                        <div style={{ 
                          height: "100%", 
                          width: `${progress}%`, 
                          background: `linear-gradient(90deg, ${course?.color || "#8b5cf6"}, ${course?.color || "#8b5cf6"}80)`, 
                          borderRadius: 3, 
                          transition: "width 1s ease" 
                        }} />
                      </div>
                      <div style={{ color: "#64748b", fontSize: 12 }}>{progress}% complete</div>
                    </div>
                    <div style={{ color: course?.color || "#8b5cf6", fontWeight: 700 }}>{progress}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeSection === "sessions" && (
          <div>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 32, fontFamily: "'Playfair Display', serif" }}>Live Sessions</h2>
            {(dashboardData?.upcomingSessions || []).map((s, i) => (
              <div 
                key={i} 
                style={{
                  background: "rgba(255,255,255,0.03)", 
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16, 
                  padding: 24, 
                  marginBottom: 16,
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center"
                }}
              >
                <div>
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{s.title}</h3>
                  <p style={{ color: "#64748b", fontSize: 14 }}>
                    with {s.mentor?.initials || "Mentor"} • {new Date(s.scheduledAt).toLocaleString()}
                  </p>
                </div>
                <button style={{
                  background: s.status === "scheduled" || s.status === "live" ? "linear-gradient(135deg, #8b5cf6, #06b6d4)" : "rgba(255,255,255,0.05)",
                  color: s.status === "scheduled" || s.status === "live" ? "#fff" : "#64748b",
                  border: "none", 
                  padding: "10px 20px", 
                  borderRadius: 10, 
                  fontWeight: 600, 
                  cursor: "pointer", 
                  fontFamily: "inherit"
                }}>
                  {s.status === "live" ? "Join Now" : s.status === "scheduled" ? "Scheduled" : "Completed"}
                </button>
              </div>
            ))}
          </div>
        )}

        {(activeSection === "courses" || activeSection === "mentors" || activeSection === "certificates") && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50vh", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 64 }}>
              {activeSection === "courses" ? "📚" : activeSection === "mentors" ? "👤" : "🏆"}
            </div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, textAlign: "center" }}>
              {activeSection === "courses" ? "Your Enrolled Courses" : activeSection === "mentors" ? "Your Mentor Sessions" : "Your Certificates"}
            </div>
            <div style={{ color: "#64748b", textAlign: "center" }}>This section is fully functional in the live app</div>
          </div>
        )}
      </div>
    </div>
  );
}
