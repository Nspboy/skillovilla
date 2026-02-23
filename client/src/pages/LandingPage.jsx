import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import Badge from '../components/Badge';
import { coursesAPI } from '../services/api';

const COMPANIES = [
  { name: "Google", logo: "https://www.vectorlogo.zone/logos/google/google-ar21.svg" },
  { name: "Microsoft", logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg" },
  { name: "Amazon", logo: "https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg" },
  { name: "Flipkart", logo: "https://www.vectorlogo.zone/logos/flipkart/flipkart-ar21.svg" },
  { name: "Zomato", logo: "https://www.vectorlogo.zone/logos/zomato/zomato-ar21.svg" },
  { name: "Razorpay", logo: "https://www.vectorlogo.zone/logos/razorpay/razorpay-ar21.svg" }
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
  const [currentBrandIdx, setCurrentBrandIdx] = useState(0);

  const brandingImages = [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop", // Netflix
    "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=1000&auto=format&fit=crop", // Google
    "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1000&auto=format&fit=crop", // Discord/Community style
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop"  // Esports/NBC style
  ];

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
        <section id="hero" style={{ 
          position: "relative",
          minHeight: "850px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 2
        }}>
          <div className="main-container">
          
            <div className="responsive-grid-2" style={{ 
              width: "100%", 
              position: "relative",
              alignItems: "center",
              gap: "80px"
            }}>
              <div className="animate-fade-in">
                <div style={{ display: "inline-flex", background: "rgba(139, 92, 246, 0.1)", padding: "12px 24px", borderRadius: 100, marginBottom: 32, border: "1px solid rgba(139, 92, 246, 0.2)" }}>
                    <span style={{ color: "var(--primary)", fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>✨ India's #1 Career Platform</span>
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
                <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "var(--text-sub)", marginBottom: 60, maxWidth: 580, lineHeight: 1.6, fontWeight: 500, opacity: 0.8 }}>
                  Conquer your tasks and take control with our Task Manager App. Master in-demand skills and join the elite tech workforce.
                </p>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <button 
                    className="hover-float shimmer-btn"
                    onClick={() => navigate("/courses")} 
                    style={{ 
                      padding: "18px 42px", 
                      background: "linear-gradient(135deg, var(--primary) 0%, #7C3AED 100%)", 
                      color: "#fff", 
                      border: "none", 
                      borderRadius: 100, 
                      fontSize: 16, 
                      fontWeight: 900, 
                      cursor: "pointer",
                      boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)",
                    }}>
                    Learn More →
                  </button>
                  <button 
                    className="hover-float"
                    style={{ 
                      padding: "18px 42px", 
                      background: "#fff", 
                      color: "var(--dark)", 
                      border: "1px solid #E2E8F0", 
                      borderRadius: 100, 
                      fontSize: 16, 
                      fontWeight: 800, 
                      cursor: "pointer",
                    }}>
                    Book a Demo
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
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02)"}
                onMouseLeave={e => e.currentTarget.style.transform = "perspective(1000px) rotateY(-5deg) rotateX(5deg)"}
                >
                    <div style={{ 
                        background: "#fff",
                        borderRadius: "clamp(30px, 5vw, 60px)",
                        padding: 12,
                        boxShadow: "0 80px 150px rgba(0,0,0,0.15)",
                        border: "1px solid rgba(255,255,255,0.4)"
                    }}>
                        <img 
                          key={currentBrandIdx}
                          src={brandingImages[currentBrandIdx]} 
                          style={{ 
                            width: "100%", 
                            borderRadius: "clamp(20px, 4vw, 50px)",
                            animation: "fadeIn 0.8s ease-out" 
                          }} 
                          alt="" 
                        />
                    </div>
                </div>

                {/* Floating Elements with Enhanced Interactivity */}
                <div 
                  className="floating-badge" 
                  style={{ 
                    top: "10%", 
                    right: "-12%", 
                    animation: "logo-float 4s ease-in-out infinite",
                    display: "flex",
                    alignItems: "center",
                    gap: 16
                  }}
                >
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: "#F59E0B15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>⭐</div>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 18, color: "var(--dark)" }}>Trustpilot <span style={{ color: "#F59E0B" }}>4.8</span></div>
                      <div style={{ fontSize: 12, color: "var(--text-sub)", fontWeight: 700 }}>Top Rated App</div>
                    </div>
                </div>

                <div 
                  className="floating-badge" 
                  style={{ 
                    bottom: "12%", 
                    left: "-15%", 
                    display: "block", 
                    minWidth: 260, 
                    cursor: "pointer",
                    animation: "logo-float 4.5s ease-in-out infinite",
                    animationDelay: "0.5s",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                  onClick={() => setCurrentBrandIdx((prev) => (prev + 1) % brandingImages.length)}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "scale(1.05) translateY(-5px)";
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.boxShadow = "0 40px 80px rgba(139, 92, 246, 0.2)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                    e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.08)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ 
                        width: 14, 
                        height: 14, 
                        borderRadius: "50%", 
                        background: "var(--primary)",
                        boxShadow: "0 0 10px var(--primary)"
                      }}></div>
                      <div style={{ fontWeight: 900, fontSize: 16, color: "var(--dark)" }}>Custom Workflow</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                      {[1,2,3,4].map(i => (
                        <div 
                          key={i} 
                          style={{ 
                            height: 8, 
                            width: "22%", 
                            background: i <= (currentBrandIdx + 1) ? "var(--primary)" : "#E2E8F0", 
                            borderRadius: 4,
                            transition: "all 0.4s ease" 
                          }}
                        ></div>
                      ))}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-sub)", fontWeight: 800, marginTop: 12, opacity: 0.6, textAlign: "right", letterSpacing: 0.5 }}>
                    CLICK TO SWITCH BRAND →
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PARTNERS */}
        <section id="partners" className="reveal-up" style={{ padding: "40px 0 80px", position: "relative", zIndex: 10 }}>
          <div className="main-container">
            <div className="glass-card" style={{ padding: "32px 0", borderRadius: 100, display: "flex", flexDirection: "column", alignItems: "center", overflow: "hidden" }}>
              <p style={{ color: "var(--text-sub)", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: 3, marginBottom: 24, opacity: 0.8, textAlign: "center" }}>
                Powering the next generation of tech leaders
              </p>
              <div className="marquee-wrapper">
                <div className="marquee-inner">
                  {[...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES].map((c, i) => (
                    <div key={i} className="partner-logo-item">
                      <img src={c.logo} alt={c.name} className="partner-logo" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURES & COURSES WRAPPER (White with bottom curve) */}
        <div className="section-curve-white-to-purple" style={{ background: "#F8FAFC" }}>
          {/* Features */}
          <section id="features" style={{ padding: "var(--section-padding) 0", position: "relative" }}>
            <div className="main-container">
              <div style={{ textAlign: "center", marginBottom: 80 }}>
                <Badge text="Comprehensive Feature Set" color="var(--primary)" style={{ background: "#F5F3FF" }} />
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 4rem)", marginBottom: 24, color: "var(--dark)", fontWeight: 900, letterSpacing: "-2px" }}>
                  Why 50,000+ Students Choose Us
                </h2>
              </div>
              <div className="responsive-grid-3">
                {[
                  { icon: "🎓", title: "Industry Mentors", desc: "Get trained by experts from Google, Amazon, and Microsoft.", color: "#8B5CF6" },
                  { icon: "🛠️", title: "Project-Led", desc: "Build industry-standard projects that showcase your skills.", color: "#EC4899" },
                  { icon: "💼", title: "Career Support", desc: "From resume building to 500+ hiring partners.", color: "#6366F1" },
                ].map((v, i) => (
                  <div key={i} className="glass-card hover-lift reveal-up" style={{ padding: "40px", borderRadius: 40, border: "1px solid rgba(139, 92, 246, 0.1)", animationDelay: `${i * 0.2}s` }}>
                    <div className="animate-logo-float card-logo-hover-target" style={{ width: 64, height: 64, background: `${v.color}15`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 24 }}>{v.icon}</div>
                    <h3 style={{ marginBottom: 12, fontSize: 22, fontWeight: 900, color: "var(--dark)" }}>{v.title}</h3>
                    <p style={{ color: "var(--text-sub)", lineHeight: 1.6, fontSize: 16 }}>{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Courses */}
          <section id="programs" style={{ padding: "60px 0 160px" }}>
            <div className="main-container">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 60, flexWrap: "wrap", gap: "20px" }}>
                <h2 style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 900, letterSpacing: "-1.5px" }}>Our High-Impact Programs</h2>
                <div style={{ display: "flex", background: "#F5F3FF", padding: "6px", borderRadius: 100, overflowX: "auto" }} className="hide-scrollbar">
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
                      whiteSpace: "nowrap"
                    }}>{cat}</button>
                  ))}
                </div>
              </div>
              <div className="responsive-grid-3">
                {filtered.slice(0, 6).map((course, i) => (
                  <div key={course._id} className="reveal-up" style={{ animationDelay: `${i * 0.15}s` }}>
                    <CourseCard course={course} onClick={() => navigate(`/courses/${course._id}`)} />
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 80 }}>
                <button 
                  onClick={() => navigate("/courses")}
                  style={{ 
                    background: "transparent", 
                    color: "var(--primary)", 
                    border: "2px solid var(--primary)", 
                    padding: "16px 40px", 
                    borderRadius: 100, 
                    fontWeight: 800, 
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "var(--primary)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                >
                  View All Programs →
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* 4. TESTIMONIALS & FEATURES GRID (Premium Dark Cleanup) */}
        <div className="premium-dark-section-v2">
          <section id="alumni" style={{ padding: "0", position: "relative", zIndex: 1 }}>
            <div className="main-container">
              <div style={{ textAlign: "center", marginBottom: 80 }}>
                <Badge text="Alumni Success" color="#fff" style={{ background: "rgba(255,255,255,0.1)" }} />
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: 24, fontWeight: 900, color: "#fff", letterSpacing: "-2px" }}>Real Stories, Real Transformations</h2>
              </div>
              <div className="responsive-grid-3">
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="glass-card-premium-dark hover-lift-dark reveal-up" style={{ 
                    padding: "40px", 
                    borderRadius: 40, 
                    animationDelay: `${i * 0.2}s`
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                      <img src={t.img} alt={t.name} style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)" }} />
                      <div>
                        <div style={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>{t.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700 }}>{t.role}</div>
                      </div>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, lineHeight: 1.6, fontStyle: "italic" }}>
                      "{t.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Refined Feature Grid with High Contrast */}
          <section style={{ padding: "120px 0 0" }}>
            <div className="main-container">
              <div className="responsive-grid-3" style={{ alignItems: "stretch" }}>
                {/* Custom Workflow Card */}
                <div className="glass-card-premium-dark hover-lift-dark hover-border-glow" style={{ padding: "40px", borderRadius: "40px" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(139, 92, 246, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 24 }}>⚙️</div>
                  <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 16, color: "#fff" }}>Custom Workflow</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7 }}>
                    Define unique issue states for each team. Users can define the steps, rules, and actions that make up their custom workflow.
                  </p>
                </div>
 
                {/* Multi-team Projects Card */}
                <div className="glass-card-premium-dark hover-lift-dark hover-border-glow" style={{ padding: "40px", borderRadius: "40px" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(99, 102, 241, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 24 }}>👥</div>
                  <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 16, color: "#fff" }}>Multi-team projects</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7 }}>
                    Collaborate across teams and departments. The Multi-team project features enable users to create sub-teams and delegate tasks properly.
                  </p>
                </div>
 
                {/* Student Social Proof Card */}
                <div className="glass-card-premium-dark hover-lift-dark hover-border-glow" style={{ padding: "40px", borderRadius: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", marginBottom: 24 }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} alt="" style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #0F172A", marginLeft: i === 1 ? 0 : -15 }} />
                    ))}
                  </div>
                  <div style={{ fontSize: 20, color: "#fff", fontWeight: 900, lineHeight: 1.2 }}>
                    5M+ Students 🥇
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginTop: 12 }}>Join the world's most vibrant learning community.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 5. FINAL CTA SECTION (Exact Design Fidelity) */}
        <section className="section-light-bg reveal-up" style={{ borderRadius: "0 0 100px 100px" }}>
          <div className="main-container" style={{ position: "relative" }}>
            <div className="cta-elite-card">
              <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 850, margin: "0 auto" }}>
                <h2 className="slide-up-fade" style={{ 
                  fontSize: "clamp(3.5rem, 6vw, 6.5rem)", 
                  marginBottom: 24, 
                  fontWeight: 900, 
                  color: "#FFFFFF", 
                  letterSpacing: "-4px",
                  lineHeight: 1,
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  Ready to Start Your <br />
                  Journey?
                </h2>
                <p className="slide-up-fade" style={{ 
                  color: "#FFFFFF", 
                  fontSize: 20, 
                  marginBottom: 64, 
                  fontWeight: 500, 
                  maxWidth: 580, 
                  margin: "0 auto 64px", 
                  lineHeight: 1.4, 
                  animationDelay: "0.2s",
                  opacity: 1
                }}>
                  Join 50,000+ students who have transformed their careers with TalentStack's industry-led mentorship.
                </p>
                <div className="slide-up-fade" style={{ animationDelay: "0.4s" }}>
                  <button 
                    className="btn-gold-elite"
                    onClick={() => navigate("/signup")} 
                  >
                    Get Started For Free
                  </button>
                </div>
                
                {/* Knockout Social Proof */}
                <div className="slide-up-fade" style={{ marginTop: 80, animationDelay: "0.6s" }}>
                  <p style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 4, marginBottom: 24, opacity: 0.9 }}>Trusted by students from</p>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 60, filter: "brightness(0) invert(1) opacity(1)" }}>
                    {COMPANIES.slice(0, 4).map((c, i) => (
                      <img key={i} src={c.logo} alt={c.name} style={{ height: 24, width: "auto" }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 4-Point Star (Sparkle) matching image exactly */}
            <svg className="floating-star" viewBox="0 0 24 24" fill="currentColor" style={{ width: 100, height: 100 }}>
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}
