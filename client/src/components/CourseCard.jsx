import { useState } from 'react';
import StarRating from './StarRating';
import Badge from './Badge';

export default function CourseCard({ course, onClick }) {
  return (
    <div 
      onClick={onClick} 
      className="hover-lift"
      style={{
        background: "#fff",
        border: "1px solid rgba(139, 92, 246, 0.08)",
        borderRadius: 32, 
        padding: "clamp(20px, 4vw, 30px)", 
        cursor: "pointer",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{
        width: "100%", 
        height: 200, 
        borderRadius: 24, 
        marginBottom: 24,
        background: `linear-gradient(135deg, ${course.color}15, ${course.color}05)`,
        border: `1px solid ${course.color}10`,
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        position: "relative", 
        overflow: "hidden"
      }}>
        <img 
          src={course.thumbnail || `https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop`} 
          alt={course.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className="course-card-thumbnail"
        />
        <div style={{ 
          position: "absolute", 
          top: 0, 
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.05))`
        }} />
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
            letterSpacing: "0.8px",
            boxShadow: `0 4px 12px ${course.color}40`,
            zIndex: 1
          }}>
            {course.tag}
          </span>
        )}
      </div>
      <h3 style={{ color: "var(--dark)", fontWeight: 900, fontSize: "clamp(1.1rem, 2vw, 1.4rem)", marginBottom: 12, letterSpacing: "-0.8px", lineHeight: 1.2 }}>
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
          boxShadow: "none",
          transition: "all 0.3s"
        }}>
          →
        </button>
      </div>
    </div>
  );
}
