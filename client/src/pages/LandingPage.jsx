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
    <div style={{ paddingTop: "var(--header-height)" }}>
      {/* 1. HERO SECTION */}
      <section style={{ 
        background: "linear-gradient(135deg, #F0F7FF 0%, #FFFFFF 100%)", 
        padding: "120px 60px",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: 80,
        alignItems: "center",
        maxWidth: 1400,
        margin: "0 auto"
      }} className="animate-fade-in">
        <div>
          <Badge text="✨ India's #1 Career Accelerator Platform" color="var(--primary)" />
          <h1 style={{ 
            fontSize: "clamp(3.5rem, 6vw, 4.5rem)", 
            lineHeight: 1.05, 
            marginBottom: 28, 
            color: "var(--dark)",
            fontWeight: 900,
            letterSpacing: "-1.5px"
          }}>
            Accelerate Your Career with <span style={{ color: "var(--primary)" }}>Industry Experts.</span>
          </h1>
          <p style={{ fontSize: 20, color: "var(--text-sub)", marginBottom: 44, maxWidth: 550, lineHeight: 1.6 }}>
            Master in-demand skills with our project-based curriculum. Learn from the top 1% and get placed at your dream company.
          </p>
          <div style={{ display: "flex", gap: 18 }}>
            <button onClick={() => navigate("/courses")} style={{ 
              padding: "18px 40px", 
              background: "var(--primary)", 
              color: "#fff", 
              border: "none", 
              borderRadius: 12, 
              fontSize: 17, 
              fontWeight: 800, 
              cursor: "pointer",
              boxShadow: "0 12px 24px rgba(0, 86, 210, 0.25)",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Explore Tracks
            </button>
            <button style={{ 
              padding: "18px 40px", 
              background: "#fff", 
              color: "var(--dark)", 
              border: "2px solid #E2E8F0", 
              borderRadius: 12, 
              fontSize: 17, 
              fontWeight: 700, 
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#E2E8F0"}
            >
              Book a Free Demo
            </button>
          </div>
          <div style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex" }}>
              {[1, 2, 3, 4, 5].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #fff", marginLeft: i === 1 ? 0 : -12, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }} />
              ))}
            </div>
            <div style={{ fontSize: 14, color: "var(--text-main)", fontWeight: 600 }}>
              <span style={{ color: "var(--primary)" }}>50,000+</span> Students Upskilled
            </div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ 
            position: "absolute", 
            top: -20, 
            right: -20, 
            width: "100%", 
            height: "100%", 
            background: "var(--primary)", 
            opacity: 0.05, 
            borderRadius: 32, 
            zIndex: -1 
          }}></div>
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
            alt="Students Learning" 
            style={{ width: "100%", borderRadius: 32, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }} 
          />
          {/* Floating UI Elements */}
          <div style={{ 
            position: "absolute", 
            bottom: 30, 
            left: -40, 
            background: "#fff", 
            padding: "24px", 
            borderRadius: 20, 
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            zIndex: 10
          }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: "#E0F2FE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📈</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "var(--dark)" }}>92% Hike</div>
              <div style={{ fontSize: 13, color: "var(--text-sub)" }}>Average Salary Hike</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PARTNERS SECTION */}
      <section style={{ padding: "80px 0", background: "#fff", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", overflow: "hidden" }}>
        <p style={{ textAlign: "center", color: "var(--text-sub)", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 40 }}>
          Our Alumni Work At Top Global Companies
        </p>
        <div style={{ display: "flex", gap: 80, animation: "marquee 40s linear infinite", whiteSpace: "nowrap", width: "max-content", padding: "0 60px" }}>
          {[...COMPANIES, ...COMPANIES, ...COMPANIES].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, opacity: 0.5, filter: "grayscale(1)", transition: "all 0.3s" }} 
                 onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.filter = "grayscale(0)"; }}
                 onMouseLeave={e => { e.currentTarget.style.opacity = 0.5; e.currentTarget.style.filter = "grayscale(1)"; }}>
              <img src={c.logo} alt={c.name} style={{ height: 32 }} />
              <span style={{ fontWeight: 700, fontSize: 20, color: "var(--dark)" }}>{c.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY TALENTSTACK */}
      <section style={{ padding: "120px 60px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <Badge text="The TalentStack Edge" color="var(--primary)" />
            <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", marginBottom: 24, color: "var(--dark)", fontWeight: 800, letterSpacing: "-1px" }}>
              Why 50,000+ Students Choose Us
            </h2>
            <p style={{ color: "var(--text-sub)", fontSize: 20, maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>
              We don't just teach modules; we build careers with a comprehensive ecosystem designed for your success.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {[
              { icon: "🎓", title: "Top 1% Industry Mentors", desc: "Get trained by experts currently working at top-tier tech companies like Google, Amazon, and Microsoft." },
              { icon: "🛠️", title: "Project-Led Learning", desc: "Build industry-standard projects that showcase your skills to potential recruiters and hiring managers." },
              { icon: "💼", title: "360° Career Support", desc: "From resume building to unlimited mock interviews and direct referrals to 500+ hiring partners." },
              { icon: "🌍", title: "Global Community", desc: "Join an elite network of tech professionals and alumni working across the globe in diverse roles." },
              { icon: "⚡", title: "Job-Ready Curriculum", desc: "Our curriculum is co-created with industry leaders to ensure you learn exactly what companies need." },
              { icon: "🤝", title: "Lifetime Access", desc: "Access all course materials, community events, and career portals for a lifetime, even after you get placed." },
            ].map((v, i) => (
              <div key={i} style={{ 
                background: "#fff", 
                padding: "48px", 
                borderRadius: 24, 
                boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.04)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.03)"; }}
              >
                <div style={{ width: 64, height: 64, background: "rgba(0, 86, 210, 0.05)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 28 }}>{v.icon}</div>
                <h3 style={{ marginBottom: 16, fontSize: 22, fontWeight: 700, color: "var(--dark)" }}>{v.title}</h3>
                <p style={{ color: "var(--text-sub)", lineHeight: 1.7, fontSize: 16 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROGRAM TABS */}
      <section style={{ padding: "120px 60px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
            <div>
              <Badge text="Future-Proof Tracks" color="var(--primary)" />
              <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3rem)", fontWeight: 800, marginTop: 12, letterSpacing: "-1px" }}>Our High-Impact Programs</h2>
            </div>
            <div style={{ display: "flex", background: "#F1F5F9", padding: "6px", borderRadius: 100 }}>
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveTab(cat)} 
                  style={{
                    padding: "12px 28px",
                    borderRadius: 100,
                    border: "none",
                    background: activeTab === cat ? "#fff" : "transparent",
                    color: activeTab === cat ? "var(--primary)" : "var(--text-sub)",
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    boxShadow: activeTab === cat ? "0 4px 10px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.2s"
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
            {filtered.slice(0, 6).map(course => (
              <CourseCard key={course._id} course={course} onClick={() => navigate(`/courses/${course._id}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SUCCESS STORIES */}
      <section style={{ padding: "120px 60px", background: "#0F172A", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(circle at top right, rgba(0, 86, 210, 0.15), transparent)", pointerEvents: "none" }}></div>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <Badge text="Alumni Success" color="var(--primary)" />
            <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", marginBottom: 24, fontWeight: 800 }}>Real Stories, Real Transformations</h2>
            <p style={{ color: "#94A3B8", fontSize: 20, maxWidth: 600, margin: "0 auto" }}>Join the thousands who have rewritten their career stories with TalentStack.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ 
                background: "rgba(255,255,255,0.03)", 
                padding: "40px", 
                borderRadius: 28, 
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "all 0.3s ease",
                cursor: "default"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(-5px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
                  <img src={t.img} alt={t.name} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--primary)" }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 19 }}>{t.name}</div>
                    <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 2 }}>{t.role}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                      <span style={{ color: "#10B981", fontWeight: 800, fontSize: 15 }}>{t.package}</span>
                      <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>Package</span>
                    </div>
                  </div>
                </div>
                <p style={{ color: "#CBD5E1", fontSize: 16, lineHeight: 1.8, fontStyle: "italic" }}>
                  <span style={{ fontSize: 40, color: "var(--primary)", display: "block", height: 20, opacity: 0.5 }}>“</span>
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. UPSKILL YOUR TEAM */}
      <section style={{ padding: "120px 60px", background: "#fff" }}>
        <div style={{ 
          maxWidth: 1200, 
          margin: "0 auto", 
          background: "linear-gradient(135deg, #0056D2 0%, #002D70 100%)", 
          borderRadius: 40, 
          padding: "100px 80px", 
          display: "grid", 
          gridTemplateColumns: "1.1fr 0.9fr", 
          gap: 60, 
          alignItems: "center", 
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0, 86, 210, 0.2)"
        }}>
          <div style={{ position: "absolute", bottom: -50, right: -50, width: 300, height: 300, background: "rgba(255,255,255,0.05)", borderRadius: "50%" }}></div>
          <div>
            <Badge text="For Organizations" color="rgba(255,255,255,0.2)" />
            <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", marginBottom: 28, fontWeight: 800, letterSpacing: "-1px" }}>Upskill Your Team with Industry-Led Training</h2>
            <p style={{ fontSize: 20, opacity: 0.9, marginBottom: 44, lineHeight: 1.7 }}>
              Empower your workforce with data-driven and tech-first skills. Customizable programs designed to meet your business objectives.
            </p>
            <button style={{ 
              padding: "18px 40px", 
              background: "#fff", 
              color: "var(--primary)", 
              border: "none", 
              borderRadius: 12, 
              fontWeight: 800, 
              fontSize: 17,
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >Contact Sales</button>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { icon: "📅", label: "Live Interactive Classes" },
              { icon: "📄", label: "Curated Industry Curriculum" },
              { icon: "📊", label: "Employee Progress Analytics" },
              { icon: "🏆", label: "Industry Recognized Certificates" },
              { icon: "👨‍🏫", label: "Dedicated Success Manager" },
              { icon: "🧪", label: "Hands-on Capstone Projects" }
            ].map(tag => (
              <div key={tag.label} style={{ 
                background: "rgba(255,255,255,0.08)", 
                padding: "16px 24px", 
                borderRadius: 16, 
                fontSize: 15, 
                fontWeight: 600, 
                display: "flex", 
                alignItems: "center", 
                gap: 10,
                border: "1px solid rgba(255,255,255,0.1)"
              }}>
                <span>{tag.icon}</span>
                {tag.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section style={{ padding: "120px 60px", textAlign: "center", background: "#f8fafc" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(3rem, 5vw, 4rem)", marginBottom: 28, fontWeight: 900, color: "var(--dark)", letterSpacing: "-2px" }}>Ready to Start Your Journey?</h2>
          <p style={{ color: "var(--text-sub)", fontSize: 22, marginBottom: 50, lineHeight: 1.6 }}>Join 50,000+ students who have transformed their careers with TalentStack.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            <button onClick={() => navigate("/signup")} style={{ 
              padding: "22px 56px", 
              background: "var(--primary)", 
              color: "#fff", 
              border: "none", 
              borderRadius: 16, 
              fontSize: 20, 
              fontWeight: 800, 
              cursor: "pointer",
              boxShadow: "0 15px 30px rgba(0, 86, 210, 0.3)",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Get Started For Free
            </button>
          </div>
          <p style={{ marginTop: 32, fontSize: 14, color: "var(--text-sub)", fontWeight: 500 }}>No credit card required • Lifetime access to community</p>
        </div>
      </section>
    </div>
  );
}
