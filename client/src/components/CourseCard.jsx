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
        background: hover ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hover ? course.color + "40" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 20, 
        padding: 24, 
        cursor: "pointer",
        transition: "all 0.25s", 
        transform: hover ? "translateY(-4px)" : "",
        boxShadow: hover ? `0 16px 40px rgba(0,0,0,0.4)` : "none"
      }}
    >
      <div style={{
        width: "100%", 
        height: 120, 
        borderRadius: 12, 
        marginBottom: 20,
        background: `linear-gradient(135deg, ${course.color}20, ${course.color}10)`,
        border: `1px solid ${course.color}20`,
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontSize: 48, 
        position: "relative", 
        overflow: "hidden"
      }}>
        <div style={{ 
          position: "absolute", 
          top: 0, 
          right: 0, 
          width: 80, 
          height: 80, 
          background: `radial-gradient(circle at top right, ${course.color}20, transparent)` 
        }} />
        {course.icon}
        {course.tag && (
          <span style={{ 
            position: "absolute", 
            top: 12, 
            right: 12, 
            background: course.color, 
            color: "#fff", 
            padding: "3px 10px", 
            borderRadius: 100, 
            fontSize: 10, 
            fontWeight: 700 
          }}>
            {course.tag}
          </span>
        )}
      </div>
      <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>
        {course.title}
      </h3>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>
        by {course.instructor?.name || course.instructor}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <Badge color="#64748b">{course.duration}</Badge>
        <Badge color={course.color}>{course.level}</Badge>
        <Badge color="#64748b">{course.category}</Badge>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StarRating rating={course.rating} />
        <span style={{ color: "#94a3b8", fontSize: 12 }}>
          {course.enrolled ? ((course.enrolled / 1000).toFixed(1) + "k enrolled") : ""}
        </span>
      </div>
      <div style={{ 
        marginTop: 16, 
        paddingTop: 16, 
        borderTop: "1px solid rgba(255,255,255,0.07)", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center" 
      }}>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>
          ₹{course.price?.toLocaleString() || "0"}
        </span>
        <span style={{ color: course.color, fontWeight: 600, fontSize: 13 }}>
          Enroll Now →
        </span>
      </div>
    </div>
  );
}
