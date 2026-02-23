import Badge from '../components/Badge';

export default function MasterclassesPage() {
  return (
    <div style={{ color: '#fff', paddingBottom: 100 }}>
      {/* Hero */}
      <section style={{ padding: "100px 24px", textAlign: "center" }}>
        <Badge text="Live Mastery" color="#8b5cf6" style={{ background: "rgba(139, 92, 246, 0.1)", marginBottom: 24 }} />
        <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: 24, letterSpacing: "-2px" }}>
          Learn from the <span style={{ color: "#8b5cf6" }}>Masters</span>.
        </h1>
        <p style={{ maxWidth: 700, margin: "0 auto", fontSize: 18, color: "#94a3b8", lineHeight: 1.6 }}>
          Deep-dive into specialized topics with industry leaders from Google, Amazon, and top startups. Free for the community.
        </p>
      </section>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 40 }}>
        {[
          { title: "Scaling System Performance", instructor: "SDE 3 @ Google", img: "https://images.unsplash.com/photo-1558494949-ef01091557d4?q=80&w=400&fit=crop", date: "March 12, 2026" },
          { title: "Product Strategy for GenAI", instructor: "VP @ Razorpay", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&fit=crop", date: "March 15, 2026" },
          { title: "Building Design Systems", instructor: "Lead @ Spotify", img: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=400&fit=crop", date: "March 18, 2026" }
        ].map((m, i) => (
          <div key={i} style={{ borderRadius: 32, overflow: "hidden", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "transform 0.3s ease" }}>
             <div style={{ height: 220, background: `url(${m.img}) center/cover` }} />
             <div style={{ padding: 32 }}>
                <div style={{ fontSize: 12, color: "var(--primary)", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{m.date}</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>{m.title}</h3>
                <div style={{ fontSize: 14, color: "#64748b", fontWeight: 500, marginBottom: 24 }}>With {m.instructor}</div>
                <button style={{ width: "100%", background: "#fff", color: "#000", border: "none", padding: "14px", borderRadius: 12, fontWeight: 800, fontSize: 14 }}>Register Free</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
