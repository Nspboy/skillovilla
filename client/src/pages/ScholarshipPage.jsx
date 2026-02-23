import Badge from '../components/Badge';

export default function ScholarshipPage() {
  return (
    <div style={{ color: '#fff' }}>
      <section style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(180deg, rgba(88, 28, 135, 0.2) 0%, #0a0a0f 100%)" }}>
        <Badge text="Financial Aid" color="#FACC15" style={{ background: "rgba(250, 204, 21, 0.1)", marginBottom: 24 }} />
        <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: 24, letterSpacing: "-2px" }}>
          The <span style={{ color: "#FACC15" }}>Ignite</span> Scholarship.
        </h1>
        <p style={{ maxWidth: 800, margin: "0 auto", fontSize: 18, color: "#94a3b8", lineHeight: 1.6 }}>
          We believe talent is universal, but opportunity is not. Our scholarship program provides up to 100% tuition coverage for meritorious students from underserved backgrounds.
        </p>
      </section>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 32, padding: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 40, textAlign: "center" }}>Eligibility & Application</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#FACC15" }}>Who can apply?</h3>
              <ul style={{ color: "#94a3b8", paddingLeft: 20, lineHeight: 2 }}>
                <li>Final year students or recent graduates</li>
                <li>Annual family income below ₹6 Lakhs</li>
                <li>Consistently high academic performance</li>
                <li>Demonstrated passion for technology or business</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#FACC15" }}>The Process</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "1. Online Application Form",
                  "2. Cognitive Ability Assessment",
                  "3. Technical/Domain Interview",
                  "4. Financial Documentation Review"
                ].map((step, i) => (
                  <div key={i} style={{ fontSize: 15, color: "#94a3b8", fontWeight: 500 }}>{step}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 60 }}>
            <button style={{ background: "#FACC15", color: "#000", border: "none", padding: "16px 40px", borderRadius: 16, fontWeight: 800, fontSize: 16, cursor: "pointer", transition: "transform 0.2s" }}>
              Apply for Ignite 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
