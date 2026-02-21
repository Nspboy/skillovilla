import { useState } from 'react';
import StarRating from './StarRating';
import Badge from './Badge';

export default function CourseCard({ course, onClick }) {
  const [hover, setHover] = useState(false);
  
  return (
    <div 
      onClick={onClick} 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hover ? "var(--primary)" : "rgba(139, 92, 246, 0.08)"}`,
        borderRadius: 32, 
        padding: 30, 
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", 
        transform: hover ? "translateY(-12px)" : "",
        boxShadow: hover ? `0 30px 60px rgba(139, 92, 246, 0.15)` : "0 8px 16px rgba(139, 92, 246, 0.03)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{
        width: "100%", 
        height: 160, 
        borderRadius: 24, 
        marginBottom: 24,
        background: `linear-gradient(135deg, ${course.color}15, ${course.color}05)`,
        border: `1px solid ${course.color}10`,
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontSize: 64, 
        position: "relative", 
        overflow: "hidden"
      }}>
        <div style={{ 
          position: "absolute", 
          top: 0, 
          right: 0, 
          width: 120, 
          height: 120, 
          background: `radial-gradient(circle at top right, ${course.color}25, transparent)` 
        }} />
        <span style={{ transition: "transform 0.4s" }} className={hover ? "scale-110" : ""}>{course.icon}</span>
        {course.tag && (
          <span style={{ 
            position: "absolute", 
            top: 16, 
            right: 16, 
            background: course.color, 
            color: "#fff", 
            padding: "5px 14px", 
            borderRadius: 100, 
            fontSize: 10, 
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.8px"
          }}>
            {course.tag}
          </span>
        )}
      </div>
      <h3 style={{ color: "var(--dark)", fontWeight: 900, fontSize: 22, marginBottom: 12, letterSpacing: "-0.8px", lineHeight: 1.2 }}>
        {course.title}
      </h3>
      <p style={{ color: "var(--text-sub)", fontSize: 15, marginBottom: 24, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--primary)" }}></span>
        by {course.instructor?.name || course.instructor}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        <Badge color="#6366F1" style={{ marginBottom: 0, background: "#EEF2FF", border: "1px solid #E0E7FF", fontSize: 10 }}>{course.duration}</Badge>
        <Badge color={course.color} style={{ marginBottom: 0, background: `${course.color}10`, border: `1px solid ${course.color}20`, fontSize: 10 }}>{course.level}</Badge>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StarRating rating={course.rating} />
        <span style={{ color: "var(--text-sub)", fontSize: 13, fontWeight: 700 }}>
          {course.enrolled ? ((course.enrolled / 1000).toFixed(1) + "k enrolled") : ""}
        </span>
      </div>
      <div style={{ 
        marginTop: 24, 
        paddingTop: 24, 
        borderTop: "1px solid #F5F3FF", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center" 
      }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "var(--text-sub)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>Full Course</span>
            <span style={{ color: "var(--dark)", fontWeight: 900, fontSize: 24 }}>
              ₹{course.price?.toLocaleString() || "0"}
            </span>
        </div>
        <button style={{ 
          background: "var(--primary)", 
          color: "#fff",
          width: 44,
          height: 44,
          borderRadius: 14,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          boxShadow: hover ? "0 8px 16px rgba(139, 92, 246, 0.25)" : "none",
          transition: "all 0.3s"
        }}>
          →
        </button>
      </div>
    </div>
  );
}
