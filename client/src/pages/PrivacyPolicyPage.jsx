import Badge from '../components/Badge';

export default function PrivacyPolicyPage() {
  return (
    <div style={{ color: '#fff', paddingBottom: 100 }}>
      {/* Hero Section */}
      <section style={{ 
        padding: "120px 24px 80px", 
        textAlign: "center", 
        background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div className="main-container">
          <Badge text="Security & Trust" color="#8B5CF6" style={{ background: "rgba(139, 92, 246, 0.1)" }} />
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginTop: 24, letterSpacing: "-2px" }}>Privacy Policy</h1>
          <p style={{ color: "#94A3B8", fontSize: "1.2rem", maxWidth: 700, margin: "24px auto 0", lineHeight: 1.6 }}>
            Your privacy is our priority. Learn how we protect and manage your data at TalentStack.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: "80px 24px" }}>
        <div className="main-container" style={{ maxWidth: 800 }}>
          <div className="glass-card-premium-dark" style={{ padding: "60px", borderRadius: 40 }}>
            <h2 style={{ color: "#fff", marginBottom: 24 }}>1. Information We Collect</h2>
            <p style={{ color: "#94A3B8", lineHeight: 1.8, marginBottom: 40 }}>
              We collect personal information that you provide directly to us when you register for programs, subscribe to our newsletter, or contact us for support. This includes your name, email address, and payment information.
            </p>

            <h2 style={{ color: "#fff", marginBottom: 24 }}>2. How We Use Data</h2>
            <p style={{ color: "#94A3B8", lineHeight: 1.8, marginBottom: 40 }}>
              Your data allows us to provide, maintain, and improve our educational services. We use it to communicate updates, process enrollments, and personalise your learning journey.
            </p>

            <h2 style={{ color: "#fff", marginBottom: 24 }}>3. Data Security</h2>
            <p style={{ color: "#94A3B8", lineHeight: 1.8, marginBottom: 40 }}>
              We implement industry-standard security measures to protect your information from unauthorised access, alteration, or disclosure. Your trust is essential to our mission.
            </p>

            <div style={{ 
              marginTop: 60, 
              paddingTop: 40, 
              borderTop: "1px solid rgba(255,255,255,0.1)",
              textAlign: "center",
              fontSize: "0.9rem",
              color: "#64748B"
            }}>
              Last updated: February 23, 2026. For questions, contact privacy@talentstack.com
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
