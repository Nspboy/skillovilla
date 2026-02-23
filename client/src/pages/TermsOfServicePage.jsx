import Badge from '../components/Badge';

export default function TermsOfServicePage() {
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
          <Badge text="Legal Framework" color="#6366F1" style={{ background: "rgba(99, 102, 241, 0.1)" }} />
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginTop: 24, letterSpacing: "-2px" }}>Terms of Service</h1>
          <p style={{ color: "#94A3B8", fontSize: "1.2rem", maxWidth: 700, margin: "24px auto 0", lineHeight: 1.6 }}>
            Understanding the agreement between you and TalentStack for a seamless learning experience.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: "80px 24px" }}>
        <div className="main-container" style={{ maxWidth: 800 }}>
          <div className="glass-card-premium-dark" style={{ padding: "60px", borderRadius: 40 }}>
            <h2 style={{ color: "#fff", marginBottom: 24 }}>1. Acceptance of Terms</h2>
            <p style={{ color: "#94A3B8", lineHeight: 1.8, marginBottom: 40 }}>
              By accessing or using the TalentStack platform, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>

            <h2 style={{ color: "#fff", marginBottom: 24 }}>2. User Responsibilities</h2>
            <p style={{ color: "#94A3B8", lineHeight: 1.8, marginBottom: 40 }}>
              You are responsible for maintaining the confidentiality of your account and password. You agree to use the platform only for lawful purposes related to professional learning.
            </p>

            <h2 style={{ color: "#fff", marginBottom: 24 }}>3. Intellectual Property</h2>
            <p style={{ color: "#94A3B8", lineHeight: 1.8, marginBottom: 40 }}>
              All course materials, including videos, documents, and code, are the property of TalentStack. They are provided for your personal learning and may not be redistributed without permission.
            </p>

            <div style={{ 
              marginTop: 60, 
              paddingTop: 40, 
              borderTop: "1px solid rgba(255,255,255,0.1)",
              textAlign: "center",
              fontSize: "0.9rem",
              color: "#64748B"
            }}>
              Last updated: February 23, 2026. For legal inquiries, contact legal@talentstack.com
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
