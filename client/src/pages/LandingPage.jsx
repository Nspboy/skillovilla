import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import Badge from '../components/Badge';
import { coursesAPI } from '../services/api';

const COMPANIES = ["Google", "Microsoft", "Amazon", "Flipkart", "Swiggy", "Zomato", "Razorpay", "CRED", "Zepto", "PhonePe", "Meesho", "Ola", "Paytm", "Byju's", "Unacademy"];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [courses, setCourses] = useState([]);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const categories = ["All", "Tech", "Business", "Design", "Marketing"];

  useEffect(() => {
    // Fetch featured courses
    coursesAPI.getAll({ featured: "true", limit: 6 }).then(res => {
      setCourses(res.data.data.courses || []);
    }).catch(err => console.error(err));

    // Animated counters
    const t = setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        i++;
        setCount1(Math.min(i * 5, 92));
        setCount2(Math.min(i * 2, 30));
        setCount3(Math.min(i * 15, 300));
        if (i >= 20) clearInterval(timer);
      }, 50);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = activeTab === "All" ? courses : courses.filter(c => c.category === activeTab);

  return (
    <div>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #0f0a1e 0%, #1a0a3e 40%, #0d1a35 100%)",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "80px 0 60px"
      }}>
        {/* Grid pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }} />
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            {/* Left */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)",
                padding: "6px 16px", borderRadius: 100, marginBottom: 24
              }}>
                <span style={{ width: 8, height: 8, background: "#8b5cf6", borderRadius: "50%", animation: "pulse 2s infinite" }} />
                <span style={{ color: "#c4b5fd", fontSize: 13, fontWeight: 600 }}>India's #1 Career Accelerator Platform</span>
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(42px, 5vw, 64px)",
                fontWeight: 900,
                lineHeight: 1.1,
                color: "#fff",
                marginBottom: 20
              }}>
                Land your <span style={{
                  background: "linear-gradient(135deg, #f97316, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>dream job</span> by learning from the{" "}
                <span style={{
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>top 1%</span>
              </h1>

              <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
                Join 50,000+ students who transformed their careers with live mentorship, real projects, and guaranteed placement support.
              </p>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
                <button onClick={() => navigate("/courses")} style={{
                  background: "linear-gradient(135deg, #f97316, #fbbf24)",
                  color: "#fff",
                  border: "none",
                  padding: "16px 32px",
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: "0 8px 32px rgba(249,115,22,0.4)",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}>Explore Programs →</button>
                <button style={{
                  background: "transparent",
                  color: "#e2e8f0",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "16px 32px",
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  backdropFilter: "blur(10px)"
                }}>▶ Watch Demo</button>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: 40 }}>
                {[
                  { val: `${count1}%`, label: "Placement Rate" },
                  { val: `${count2}L+`, label: "Avg Package" },
                  { val: `${count3}+`, label: "Hiring Partners" }
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                    <div style={{ fontSize: 13, color: "#64748b" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating cards */}
            <div style={{ position: "relative", height: 480, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{
                position: "absolute", top: "5%", right: "0%",
                background: "rgba(15,10,30,0.8)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(139,92,246,0.3)", borderRadius: 20,
                padding: 24, width: 280,
                animation: "float1 4s ease-in-out infinite"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ color: "#c4b5fd", fontSize: 13, fontWeight: 600 }}>Live Session Now</span>
                  <span style={{ background: "#ef4444", color: "#fff", padding: "2px 8px", borderRadius: 100, fontSize: 10, fontWeight: 700 }}>● LIVE</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>AM</div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>System Design Masterclass</div>
                    <div style={{ color: "#64748b", fontSize: 12 }}>Arjun Mehta • Google SDE</div>
                  </div>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: "65%", background: "linear-gradient(90deg, #8b5cf6, #06b6d4)", borderRadius: 2 }} />
                </div>
                <div style={{ color: "#64748b", fontSize: 11, marginTop: 8 }}>847 students attending</div>
              </div>

              <div style={{
                position: "absolute", bottom: "8%", left: "0%",
                background: "rgba(15,10,30,0.8)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(249,115,22,0.3)", borderRadius: 20,
                padding: 20, width: 240,
                animation: "float2 5s ease-in-out infinite"
              }}>
                <div style={{ fontSize: 11, color: "#f97316", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>🎉 Latest Placement</div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Ravi placed at Google</div>
                <div style={{ color: "#64748b", fontSize: 13 }}>Package: 45 LPA</div>
                <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>Full Stack Development</div>
              </div>

              <div style={{
                position: "absolute", top: "40%", left: "5%",
                background: "rgba(15,10,30,0.8)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(16,185,129,0.3)", borderRadius: 16,
                padding: 16, width: 200,
                animation: "float3 6s ease-in-out infinite"
              }}>
                <div style={{ fontSize: 11, color: "#10b981", fontWeight: 700, marginBottom: 8 }}>📈 Progress Update</div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>Sneha's Learning</div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, margin: "8px 0 4px" }}>
                  <div style={{ height: "100%", width: "78%", background: "linear-gradient(90deg, #10b981, #06b6d4)", borderRadius: 4 }} />
                </div>
                <div style={{ color: "#10b981", fontSize: 12, fontWeight: 700 }}>78% Complete</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY LOGOS */}
      <section style={{ background: "#0a0a0f", padding: "32px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
        <div style={{ color: "#475569", textAlign: "center", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>300+ Hiring Partners</div>
        <div style={{ display: "flex", gap: 40, animation: "marquee 20s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
          {[...COMPANIES, ...COMPANIES].map((c, i) => (
            <span key={i} style={{ color: "#475569", fontWeight: 700, fontSize: 16, letterSpacing: 1, padding: "0 8px" }}>{c}</span>
          ))}
        </div>
      </section>

      {/* VALUE PROPS */}
      <section style={{ background: "#0a0a0f", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Why 50,000+ students choose us</h2>
            <p style={{ color: "#64748b", fontSize: 17 }}>Everything you need to go from zero to hired</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[
              { icon: "🎯", title: "Top 1% Mentors", desc: "Learn directly from industry veterans at FAANG companies", color: "#f97316" },
              { icon: "📺", title: "Live Classes", desc: "Real-time interactive sessions, not pre-recorded content", color: "#8b5cf6" },
              { icon: "📄", title: "Resume Building", desc: "ATS-optimized resumes crafted by hiring managers", color: "#06b6d4" },
              { icon: "💼", title: "Job Placement", desc: "Dedicated placement support with 300+ company network", color: "#10b981" },
            ].map(v => (
              <div key={v.title} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                padding: 32,
                transition: "transform 0.2s, border-color 0.2s",
                cursor: "default"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = v.color + "50"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{v.title}</h3>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES PREVIEW */}
      <section style={{ background: "#060609", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Featured Programs</h2>
              <p style={{ color: "#64748b" }}>Curated for maximum career impact</p>
            </div>
            <button onClick={() => navigate("/courses")} style={{ background: "transparent", color: "#8b5cf6", border: "1px solid #8b5cf6", padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>View All →</button>
          </div>
          <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveTab(cat)} style={{
                background: activeTab === cat ? "linear-gradient(135deg, #8b5cf6, #06b6d4)" : "rgba(255,255,255,0.05)",
                color: activeTab === cat ? "#fff" : "#64748b",
                border: "1px solid " + (activeTab === cat ? "transparent" : "rgba(255,255,255,0.1)"),
                padding: "8px 20px", borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
              }}>{cat}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {filtered.slice(0, 6).map(course => (
              <CourseCard key={course._id} course={course} onClick={() => navigate(`/courses/${course._id}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        background: "linear-gradient(135deg, #1a0a3e, #0d1a35)",
        padding: "80px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, color: "#fff", marginBottom: 16 }}>
            Start Your <span style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Journey Today</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 18, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            Join thousands of students who've transformed their careers with SkilloVilla
          </p>
          <button onClick={() => navigate("/courses")} style={{
            background: "linear-gradient(135deg, #f97316, #fbbf24)",
            color: "#fff", border: "none", padding: "18px 48px",
            borderRadius: 14, fontSize: 18, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 8px 40px rgba(249,115,22,0.4)"
          }}>Get Started — It's Free →</button>
        </div>
      </section>
    </div>
  );
}
