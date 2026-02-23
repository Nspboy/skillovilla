import Badge from '../components/Badge';

export default function CommunityPage() {
  return (
    <div style={{ color: '#fff', paddingBottom: 100 }}>
      {/* Hero */}
      <section style={{ padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, background: "var(--primary)", opacity: 0.1, filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
        <Badge text="Join the movement" color="var(--secondary)" style={{ background: "rgba(16, 185, 129, 0.1)", marginBottom: 24 }} />
        <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: 24, letterSpacing: "-2px" }}>
          More than just a <span style={{ color: "var(--secondary)" }}>Community</span>.
        </h1>
        <p style={{ maxWidth: 700, margin: "0 auto", fontSize: 18, color: "#94a3b8", lineHeight: 1.6 }}>
          Connect with 50,000+ ambitious learners, mentors, and industry experts. Your network is your net worth.
        </p>
      </section>

      {/* Stats */}
      <div style={{ maxWidth: 1000, margin: "-40px auto 80px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, position: "relative", zIndex: 2 }}>
        {[
          { label: "Members", val: "50k+" },
          { label: "Daily Messages", val: "12k+" },
          { label: "Monthly Events", val: "40+" }
        ].map((s, i) => (
          <div key={i} style={{ padding: "32px", borderRadius: 24, background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 8, color: "var(--secondary)" }}>{s.val}</div>
            <div style={{ fontSize: 13, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chapters */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 40, textAlign: "center" }}>Explore Community Hubs</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 30 }}>
          {[
            { title: "Discord Server", desc: "Real-time chat, study rooms, and late-night coding sessions.", img: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&fit=crop", link: "https://discord.gg/talentstack" },
            { title: "Local Meetups", desc: "Connect in person in over 20+ cities across India and beyond.", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&fit=crop", link: "#" },
            { title: "Alumni Network", desc: "Exclusive access to senior professionals at top tech companies.", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&fit=crop", link: "#" }
          ].map((c, i) => (
            <div key={i} style={{ borderRadius: 28, overflow: "hidden", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ height: 200, background: `url(${c.img}) center/cover` }} />
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{c.title}</h3>
                <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{c.desc}</p>
                <button style={{ background: "rgba(255,255,255,0.05)", border: "none", padding: "10px 20px", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Join Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
