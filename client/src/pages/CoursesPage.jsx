import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { coursesAPI } from '../services/api';

export default function CoursesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [level, setLevel] = useState("All");
  const [courses, setCourses] = useState([]);
  const categories = ["All", "Tech", "Business", "Design", "Marketing"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    coursesAPI.getAll().then(res => {
      setCourses(res.data.data.courses || []);
    }).catch(err => console.error(err));
  }, []);

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                       (c.instructor?.name || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = filter === "All" || c.category === filter;
    const matchLevel = level === "All" || c.level === level;
    return matchSearch && matchCat && matchLevel;
  });

  return (
    <div style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#fff", marginBottom: 8 }}>All Programs</h1>
        <p style={{ color: "#64748b" }}>Explore {courses.length} career-transforming programs</p>
      </div>
      {/* Search + Filters */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search courses..." 
          style={{
            background: "rgba(255,255,255,0.05)", 
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12, 
            padding: "12px 20px", 
            color: "#fff", 
            fontSize: 15, 
            flex: 1, 
            minWidth: 200,
            outline: "none", 
            fontFamily: "inherit"
          }} 
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {categories.map(c => (
            <button 
              key={c} 
              onClick={() => setFilter(c)} 
              style={{
                background: filter === c ? "linear-gradient(135deg, #8b5cf6, #06b6d4)" : "rgba(255,255,255,0.05)",
                color: filter === c ? "#fff" : "#64748b", 
                border: "none",
                padding: "10px 18px", 
                borderRadius: 10, 
                fontSize: 14, 
                fontWeight: 600, 
                cursor: "pointer", 
                fontFamily: "inherit"
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <select 
          value={level} 
          onChange={e => setLevel(e.target.value)} 
          style={{
            background: "rgba(255,255,255,0.05)", 
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#94a3b8", 
            borderRadius: 10, 
            padding: "10px 16px", 
            fontSize: 14, 
            cursor: "pointer", 
            fontFamily: "inherit", 
            outline: "none"
          }}
        >
          {levels.map(l => (
            <option key={l} value={l} style={{ background: "#1e293b" }}>
              {l}
            </option>
          ))}
        </select>
      </div>
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", color: "#475569", padding: "80px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p>No courses found. Try different filters.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {filtered.map(c => (
            <CourseCard 
              key={c._id} 
              course={c} 
              onClick={() => navigate(`/courses/${c._id}`)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
