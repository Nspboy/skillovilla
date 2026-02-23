import Badge from '../components/Badge';

export default function AboutPage() {
  return (
    <div style={{ color: '#fff' }}>
      {/* Hero */}
      <section style={{ padding: "100px 24px", textAlign: "center", background: "linear-gradient(to bottom, #0f172a, #0a0a0f)" }}>
        <Badge text="Our Mission" color="var(--primary)" style={{ background: "rgba(139, 92, 246, 0.1)", marginBottom: 24 }} />
        <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: 24, letterSpacing: "-2px" }}>
          Empowering the next <span style={{ color: "var(--primary)" }}>Generation</span> of talent.
        </h1>
        <p style={{ maxWidth: 800, margin: "0 auto", fontSize: 18, color: "#94a3b8", lineHeight: 1.6 }}>
          TalentStack was born out of a simple observation: the gap between academic education and industry expectations is widening. We're here to bridge that gap.
        </p>
      </section>

      {/* Story */}
      <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>The TalentStack Journey</h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 20 }}>
              Founded in 2024, TalentStack has quickly become the preferred choice for ambitious students and professionals looking to pivot their careers.
            </p>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              Our unique approach combines rigorous technical training with soft skills and placement support, ensuring our alumni are not just job-ready, but career-proof.
            </p>
          </div>
          <div style={{ 
            height: 400, 
            borderRadius: 32, 
            background: "url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop) center/cover",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
          }} />
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "100px 24px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 60 }}>Our Core Values</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 30 }}>
            {[
              { title: "Student First", desc: "Every decision we make starts with the impact on our students' careers." },
              { title: "Continuous Innovation", desc: "The tech world moves fast. We move faster, updating our curriculum weekly." },
              { title: "Radical Transparency", desc: "No false promises. Just real results and honest feedback." }
            ].map((v, i) => (
              <div key={i} style={{ padding: 40, borderRadius: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", textAlign: "left" }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: "var(--primary)" }}>{v.title}</h3>
                <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
