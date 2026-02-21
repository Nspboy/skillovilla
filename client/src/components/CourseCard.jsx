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
        border: `1px solid ${hover ? course.color + "40" : "#E2E8F0"}`,
        borderRadius: 24, 
        padding: 24, 
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", 
        transform: hover ? "translateY(-8px)" : "",
        boxShadow: hover ? `0 20px 40px rgba(0,0,0,0.08)` : "0 4px 6px rgba(0,0,0,0.02)"
      }}
    >
      <div style={{
        width: "100%", 
        height: 140, 
        borderRadius: 16, 
        marginBottom: 20,
        background: `linear-gradient(135deg, ${course.color}15, ${course.color}05)`,
        border: `1px solid ${course.color}15`,
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontSize: 52, 
        position: "relative", 
        overflow: "hidden"
      }}>
        <div style={{ 
          position: "absolute", 
          top: 0, 
          right: 0, 
          width: 100, 
          height: 100, 
          background: `radial-gradient(circle at top right, ${course.color}25, transparent)` 
        }} />
        {course.icon}
        {course.tag && (
          <span style={{ 
            position: "absolute", 
            top: 14, 
            right: 14, 
            background: course.color, 
            color: "#fff", 
            padding: "4px 12px", 
            borderRadius: 100, 
            fontSize: 11, 
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            {course.tag}
          </span>
        )}
      </div>
      <h3 style={{ color: "var(--dark)", fontWeight: 800, fontSize: 19, marginBottom: 10, letterSpacing: "-0.3px" }}>
        {course.title}
      </h3>
      <p style={{ color: "var(--text-sub)", fontSize: 14, marginBottom: 20, fontWeight: 500 }}>
        by {course.instructor?.name || course.instructor}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        <Badge color="#64748b" style={{ marginBottom: 0 }}>{course.duration}</Badge>
        <Badge color={course.color} style={{ marginBottom: 0 }}>{course.level}</Badge>
        <Badge color="#64748b" style={{ marginBottom: 0 }}>{course.category}</Badge>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StarRating rating={course.rating} />
        <span style={{ color: "var(--text-sub)", fontSize: 13, fontWeight: 600 }}>
          {course.enrolled ? ((course.enrolled / 1000).toFixed(1) + "k enrolled") : ""}
        </span>
      </div>
      <div style={{ 
        marginTop: 20, 
        paddingTop: 20, 
        borderTop: "1px solid #F1F5F9", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center" 
      }}>
        <span style={{ color: "var(--dark)", fontWeight: 900, fontSize: 22 }}>
          ₹{course.price?.toLocaleString() || "0"}
        </span>
        <button style={{ 
          color: "var(--primary)", 
          fontWeight: 700, 
          fontSize: 14,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6
        }}>
          Enroll Now <span style={{ fontSize: 18 }}>→</span>
        </button>
      </div>
    </div>
  );
}
