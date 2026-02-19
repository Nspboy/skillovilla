import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesAPI } from '../services/api';

export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    coursesAPI.getById(id)
      .then(res => {
        setCourse(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load course details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ color: "white", padding: 40, textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ color: "red", padding: 40, textAlign: "center" }}>{error}</div>;
  if (!course) return <div style={{ color: "white", padding: 40, textAlign: "center" }}>Course not found</div>;

  return (
    <div style={{ padding: "40px", color: "white", maxWidth: 1200, margin: "0 auto" }}>
      <button 
        onClick={() => navigate(-1)}
        style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", marginBottom: 20 }}
      >
        ← Back
      </button>
      
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: 40 }}>
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          <div style={{ 
            width: 80, height: 80, 
            background: course.color || "#8b5cf6", 
            borderRadius: 20, 
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 40
          }}>
            {course.icon || "📚"}
          </div>
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>{course.title}</h1>
            <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.6, maxWidth: 800 }}>{course.description}</p>
            
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
              <span style={{ background: "rgba(139, 92, 246, 0.1)", color: "#c4b5fd", padding: "6px 12px", borderRadius: 8, fontSize: 14 }}>
                {course.level}
              </span>
              <span style={{ background: "rgba(6, 182, 212, 0.1)", color: "#67e8f9", padding: "6px 12px", borderRadius: 8, fontSize: 14 }}>
                {course.category}
              </span>
              <span style={{ background: "rgba(16, 185, 129, 0.1)", color: "#6ee7b7", padding: "6px 12px", borderRadius: 8, fontSize: 14 }}>
                {course.duration}
              </span>
            </div>
            
            <div style={{ marginTop: 32 }}>
               <button style={{
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  border: "none",
                  padding: "12px 32px",
                  borderRadius: 12,
                  color: "white",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer"
               }}>
                 Enroll Now
               </button>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Curriculum</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {course.curriculum && course.curriculum.map((module, idx) => (
                <div key={idx} style={{ 
                    background: "rgba(255,255,255,0.02)", 
                    border: "1px solid rgba(255,255,255,0.05)", 
                    borderRadius: 16, 
                    padding: 24 
                }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Module {idx + 1}: {module.title}</h3>
                    <p style={{ color: "#64748b", fontSize: 14 }}>{module.duration}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
