import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import Badge from '../components/Badge';
import { coursesAPI } from '../services/api';

const COMPANIES = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Flipkart", logo: "https://www.vectorlogo.zone/logos/flipkart/flipkart-icon.svg" },
  { name: "Zomato", logo: "https://www.vectorlogo.zone/logos/zomato/zomato-ar21.svg" },
  { name: "Razorpay", logo: "https://www.vectorlogo.zone/logos/razorpay/razorpay-icon.svg" }
];

const TESTIMONIALS = [
  {
    name: "Aman Sharma",
    role: "Data Scientist @ Google",
    package: "45 LPA",
    text: "TalentStack's curriculum and mentorship were game-changers. I went from knowing the basics to landing my dream role at Google.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Sneha Reddy",
    role: "Product Manager @ Microsoft",
    package: "32 LPA",
    text: "The project-based learning and mock interviews gave me the confidence I needed to ace the top tech interviews.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Rahul Verma",
    role: "Full Stack Developer @ Amazon",
    package: "28 LPA",
    text: "The support from mentors who are actually working in the industry is what makes TalentStack stand out from other platforms.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [courses, setCourses] = useState([]);
  const categories = ["All", "Tech", "Business", "Design", "Marketing"];

  useEffect(() => {
    coursesAPI.getAll({ featured: "true", limit: 6 }).then(res => {
      setCourses(res.data.data.courses || []);
    }).catch(err => console.error(err));
  }, []);

  const filtered = activeTab === "All" ? courses : courses.filter(c => c.category === activeTab);

  return (
    <div className="landing-wrapper">
      <div className="bg-mesh-grid" />
      
      {/* SIDEBAR - Keep it fixed or absolute relative to the wrapper */}
      <div className="sidebar-container" style={{ left: 50, zIndex: 20 }}>
          <div className="sidebar-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Riot_Games_logo.svg" alt="" />
              Riot Games
          </div>
          <div className="sidebar-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" />
              Netflix
          </div>
          <div className="sidebar-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/NBC_logo.svg" alt="" />
              NBC
          </div>
      </div>

      <div className="landing-main-card">
        {/* Decorative Wave/Accent inside the card */}
        <div className="accent-wave-bottom" style={{ height: "45%", opacity: 0.9, borderRadius: "0 0 80px 80px" }} />

        {/* 1. HERO SECTION */}
        <section style={{ 
          position: "relative",
          minHeight: "850px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 100px",
          overflow: "visible",
          zIndex: 2
        }}>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1.1fr", 
            gap: 100, 
            maxWidth: 1500, 
            width: "100%", 
            position: "relative",
            alignItems: "center"
          }}>
            <div className="animate-fade-in">
              <div style={{ display: "inline-flex", background: "rgba(139, 92, 246, 0.1)", padding: "12px 24px", borderRadius: 100, marginBottom: 32, border: "1px solid rgba(139, 92, 246, 0.2)" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>✨ India's #1 Career Accelerator Platform</span>
              </div>
              <h1 style={{ 
                fontSize: "clamp(3.5rem, 5.5vw, 5.5rem)", 
                lineHeight: 0.95, 
                marginBottom: 40, 
                color: "var(--dark)",
                fontWeight: 900,
                letterSpacing: "-3.5px"
              }}>
                Maximize Your <br/>
                <span style={{ color: "var(--primary)", position: "relative" }}>
                  Productivity
                  <svg style={{ position: "absolute", bottom: -15, left: 0, width: "100%", height: 15 }} viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 2 150 2 198 10" stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              <p style={{ fontSize: 20, color: "var(--text-sub)", marginBottom: 60, maxWidth: 580, lineHeight: 1.6, fontWeight: 500, opacity: 0.8 }}>
                Conquer your tasks and take control with our Task Manager App. Master in-demand skills and join the elite tech workforce.
              </p>
              <div style={{ display: "flex", gap: 24 }}>
                <button 
                  className="hover-float shimmer-btn"
                  onClick={() => navigate("/courses")} 
                  style={{ 
                    padding: "22px 52px", 
                    background: "linear-gradient(135deg, var(--primary) 0%, #7C3AED 100%)", 
                    color: "#fff", 
                    border: "none", 
                    borderRadius: 100, 
                    fontSize: 18, 
                    fontWeight: 900, 
                    cursor: "pointer",
                    boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)",
                  }}>
                  Learn More →
                </button>
                <button 
                  className="hover-float"
                  style={{ 
                    padding: "22px 52px", 
                    background: "#fff", 
                    color: "var(--dark)", 
                    border: "1px solid #E2E8F0", 
                    borderRadius: 100, 
                    fontSize: 18, 
                    fontWeight: 800, 
                    cursor: "pointer",
                  }}>
                  Book a Free Demo
                </button>
              </div>
              
              <div style={{ marginTop: 80, display: "flex", alignItems: "center", gap: 32 }}>
                <div style={{ display: "flex" }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+40}`} alt="" style={{ width: 50, height: 50, borderRadius: "50%", border: "4px solid #fff", marginLeft: i === 1 ? 0 : -15, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }} />
                  ))}
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: "var(--primary)", border: "4px solid #fff", marginLeft: -15, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 900, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>5M+</div>
                </div>
                <div style={{ fontSize: 16, color: "var(--text-sub)", fontWeight: 700, lineHeight: 1.3 }}>
                  Downloaded more than <br/><span style={{ opacity: 0.6 }}>5M+ in a year 🥇</span>
                </div>
              </div>
            </div>

            <div style={{ position: "relative" }} className="animate-fade-in">
              {/* Main Phone/App Mockup */}
              <div style={{ 
                  position: "relative",
                  zIndex: 5,
                  transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                  transition: "transform 0.5s"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "perspective(1000px) rotateY(-5deg) rotateX(5deg)"}
              >
                  <div style={{ 
                      background: "#fff",
                      borderRadius: 60,
                      padding: 12,
                      boxShadow: "0 80px 150px rgba(0,0,0,0.15)",
                      border: "1px solid rgba(255,255,255,0.4)"
                  }}>
                      <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" 
                           style={{ width: "100%", borderRadius: 50 }} alt="" />
                  </div>
              </div>

              {/* Floating Elements using design system classes */}
              <div className="floating-badge" style={{ top: "5%", right: "-8%" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "#F59E0B20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>⭐</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 18, color: "var(--dark)" }}>Trustpilot <span style={{ color: "#F59E0B" }}>4.8</span></div>
                    <div style={{ fontSize: 12, color: "var(--text-sub)", fontWeight: 700 }}>Top Rated App</div>
                  </div>
              </div>

              <div className="floating-badge" style={{ bottom: "8%", left: "-12%", display: "block", minWidth: 240 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom:16 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--primary)" }}></div>
                    <div style={{ fontWeight: 900, fontSize: 16, color: "var(--dark)" }}>Custom Workflow</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    {[1,2,3,4].map(i => <div key={i} style={{ height: 6, width: "22%", background: i < 4 ? "var(--primary)" : "#E2E8F0", borderRadius: 3 }}></div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PARTNERS (Refined as a glass pill) */}
        <section style={{ padding: "40px 0 80px", position: "relative", zIndex: 10 }}>
          <div className="glass-card" style={{ maxWidth: 1200, margin: "0 auto", padding: "32px", borderRadius: 100, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ color: "var(--text-sub)", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: 3, marginBottom: 24, opacity: 0.8 }}>
              Powering the next generation of tech leaders
            </p>
            <div style={{ display: "flex", gap: 80, animation: "marquee 40s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
              {[...COMPANIES, ...COMPANIES].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, opacity: 0.5 }}>
                  <img src={c.logo} alt={c.name} style={{ height: 20, filter: "grayscale(1)" }} />
                  <span style={{ fontWeight: 800, fontSize: 18, color: "var(--dark)" }}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. FEATURES & COURSES WRAPPER (White with bottom curve) */}
        <div className="section-curve-white-to-purple">
          {/* Features */}
          <section style={{ padding: "100px 80px", position: "relative" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 80 }}>
                <Badge text="Comprehensive Feature Set" color="var(--primary)" style={{ background: "#F5F3FF" }} />
                <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", marginBottom: 24, color: "var(--dark)", fontWeight: 900, letterSpacing: "-2px" }}>
                  Why 50,000+ Students Choose Us
                </h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
                {[
                  { icon: "🎓", title: "Industry Mentors", desc: "Get trained by experts from Google, Amazon, and Microsoft.", color: "#8B5CF6" },
                  { icon: "🛠️", title: "Project-Led", desc: "Build industry-standard projects that showcase your skills.", color: "#EC4899" },
                  { icon: "💼", title: "Career Support", desc: "From resume building to 500+ hiring partners.", color: "#6366F1" },
                ].map((v, i) => (
                  <div key={i} className="glass-card hover-float reveal-up" style={{ padding: "50px 40px", borderRadius: 40, border: "1px solid rgba(139, 92, 246, 0.1)", animationDelay: `${i * 0.2}s` }}>
                    <div style={{ width: 64, height: 64, background: `${v.color}15`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 24 }}>{v.icon}</div>
                    <h3 style={{ marginBottom: 12, fontSize: 22, fontWeight: 900, color: "var(--dark)" }}>{v.title}</h3>
                    <p style={{ color: "var(--text-sub)", lineHeight: 1.6, fontSize: 16 }}>{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Courses */}
          <section style={{ padding: "60px 80px 160px" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 60 }}>
                <h2 style={{ fontSize: "2.8rem", fontWeight: 900, letterSpacing: "-1.5px" }}>Our High-Impact Programs</h2>
                <div style={{ display: "flex", background: "#F5F3FF", padding: "6px", borderRadius: 100 }}>
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setActiveTab(cat)} style={{
                      padding: "10px 24px",
                      borderRadius: 100,
                      border: "none",
                      background: activeTab === cat ? "var(--primary)" : "transparent",
                      color: activeTab === cat ? "#fff" : "var(--text-sub)",
                      fontWeight: 800,
                      fontSize: 14,
                      cursor: "pointer",
                    }}>{cat}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
                {filtered.slice(0, 3).map((course, i) => (
                  <div key={course._id} className="reveal-up" style={{ animationDelay: `${i * 0.15}s` }}>
                    <CourseCard course={course} onClick={() => navigate(`/courses/${course._id}`)} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* 4. TESTIMONIALS & CTA (Purple Section) */}
        <div className="purple-section-wrapper">
          <section style={{ padding: "0 80px", position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 80 }}>
                <Badge text="Alumni Success" color="#fff" style={{ background: "rgba(255,255,255,0.1)" }} />
                <h2 style={{ fontSize: "3.5rem", marginBottom: 24, fontWeight: 900, color: "#fff", letterSpacing: "-2px" }}>Real Stories, Real Transformations</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="glass-card hover-float reveal-up" style={{ 
                    padding: "40px", 
                    borderRadius: 40, 
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    animationDelay: `${i * 0.2}s`
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                      <img src={t.img} alt={t.name} style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid #fff" }} />
                      <div>
                        <div style={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>{t.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 700 }}>{t.role}</div>
                      </div>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, lineHeight: 1.6, fontStyle: "italic" }}>
                      "{t.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Refined Purple Section Content (Matching Mutmiz Reference) */}
          <section style={{ padding: "80px 80px 0" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr) 1.2fr", gap: 60, alignItems: "center" }}>
                {/* Custom Workflow Card */}
                <div style={{ color: "#fff" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 24 }}>⚙️</div>
                  <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 16 }}>Custom Workflow</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.6, maxWidth: 300 }}>
                    Define unique issue states for each team. Users can define the steps, rules, and actions that make up their custom workflow.
                  </p>
                </div>

                {/* Multi-team Projects Card */}
                <div style={{ color: "#fff" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 24 }}>👥</div>
                  <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 16 }}>Multi-team projects</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.6, maxWidth: 300 }}>
                    Collaborate across teams and departments. The Multi-team project features enable users to create sub-teams and delegate tasks properly.
                  </p>
                </div>

                {/* Student Social Proof Bar (Right Side / End of Section) */}
                <div style={{ display: "flex", alignItems: "center", gap: 24, background: "rgba(255,255,255,0.05)", padding: "24px 32px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.1)", justifySelf: "end" }}>
                  <div style={{ display: "flex" }}>
                    {[1, 2, 3, 4].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" style={{ width: 42, height: 42, borderRadius: "50%", border: "3px solid #6D28D9", marginLeft: i === 1 ? 0 : -12 }} />
                    ))}
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#fff", border: "3px solid #6D28D9", marginLeft: -12, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", fontSize: 11, fontWeight: 900 }}>5M+</div>
                  </div>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 700, lineHeight: 1.2 }}>
                    Downloaded more than <br/><span style={{ opacity: 0.8 }}>5M+ in a year 🥇</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 5. FINAL CTA SECTION (Fixed Visibility & Clean Design) */}
        <section className="final-cta-section">
          {/* Subtle blurred accents */}
          <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 500, height: 500, background: "var(--primary-light)", borderRadius: "50%", filter: "blur(120px)", opacity: 0.15 }}></div>
          
          <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <h2 style={{ 
              fontSize: "clamp(3rem, 5vw, 4.5rem)", 
              marginBottom: 20, 
              fontWeight: 900, 
              color: "var(--dark)", 
              letterSpacing: "-2.5px",
              lineHeight: 1
            }}>
              Ready to Start Your <span style={{ color: "var(--primary)" }}>Journey?</span>
            </h2>
            <p style={{ color: "var(--text-sub)", fontSize: 18, marginBottom: 50, fontWeight: 500, opacity: 0.8 }}>
              Join 50,000+ students who have transformed their careers with TalentStack.
            </p>
            <button 
              className="hover-float shimmer-btn"
              onClick={() => navigate("/signup")} 
              style={{ 
                padding: "24px 64px", 
                background: "linear-gradient(135deg, var(--primary) 0%, #7C3AED 100%)", 
                color: "#fff", 
                border: "none", 
                borderRadius: 100, 
                fontSize: 22, 
                fontWeight: 900, 
                cursor: "pointer",
                boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)",
              }}>
              Get Started For Free
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
