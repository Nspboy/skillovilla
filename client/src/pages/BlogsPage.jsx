import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../components/Badge';
import { blogsAPI } from '../services/api';

export default function BlogsPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogsAPI.getAll().then(res => {
      setBlogs(res.data.data.blogs || []);
    }).catch(err => console.error(err));
  }, []);

  const featured = blogs[0];
  const sidebar = blogs.slice(1);

  return (
    <div style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Career Insights</h1>
        <p style={{ color: "#64748b" }}>Strategies, tips, and stories from those who've made it</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        {/* Featured */}
        {featured && (
          <div style={{
            background: `linear-gradient(135deg, ${featured.color || "#8b5cf6"}15, rgba(255,255,255,0.02))`,
            border: `1px solid ${featured.color || "#8b5cf6"}30`,
            borderRadius: 24, 
            padding: 40, 
            cursor: "pointer"
          }}
          onClick={() => navigate(`/blogs/${featured.slug}`)}
          >
            <Badge color={featured.color || "#8b5cf6"}>{featured.category}</Badge>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 26, margin: "16px 0 12px", lineHeight: 1.3 }}>
              {featured.title}
            </h2>
            <p style={{ color: "#64748b", lineHeight: 1.7, marginBottom: 24 }}>
              {featured.excerpt || "Read the full article to learn more..."}
            </p>
            <div style={{ display: "flex", gap: 20, color: "#475569", fontSize: 13 }}>
              <span>✍️ {featured.author?.name || "Author"}</span>
              <span>📅 {new Date(featured.publishedAt || featured.createdAt).toLocaleDateString()}</span>
              <span>⏱ {featured.readTime}</span>
              <span>👁 {featured.views || 0} views</span>
            </div>
          </div>
        )}
        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {sidebar.map(b => (
            <div 
              key={b._id} 
              style={{
                background: "rgba(255,255,255,0.03)", 
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, 
                padding: 20, 
                cursor: "pointer",
                transition: "border-color 0.2s"
              }}
              onClick={() => navigate(`/blogs/${b.slug}`)}
            >
              <Badge color={b.color || "#8b5cf6"}>{b.category}</Badge>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 15, margin: "10px 0 8px", lineHeight: 1.4 }}>
                {b.title}
              </h3>
              <div style={{ display: "flex", gap: 12, color: "#475569", fontSize: 12 }}>
                <span>{b.readTime}</span>
                <span>{b.views || 0} views</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
