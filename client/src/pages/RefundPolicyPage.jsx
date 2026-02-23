import Badge from '../components/Badge';

export default function RefundPolicyPage() {
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
          <Badge text="Financial Transparency" color="#EC4899" style={{ background: "rgba(236, 72, 153, 0.1)" }} />
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginTop: 24, letterSpacing: "-2px" }}>Refund Policy</h1>
          <p style={{ color: "#94A3B8", fontSize: "1.2rem", maxWidth: 700, margin: "24px auto 0", lineHeight: 1.6 }}>
            Our commitment to fairness and clarity regarding your investment in your career.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: "80px 24px" }}>
        <div className="main-container" style={{ maxWidth: 800 }}>
          <div className="glass-card-premium-dark" style={{ padding: "60px", borderRadius: 40 }}>
            <h2 style={{ color: "#fff", marginBottom: 24 }}>1. 7-Day Money Back Guarantee</h2>
            <p style={{ color: "#94A3B8", lineHeight: 1.8, marginBottom: 40 }}>
              We offer a 7-day refund policy for all our standard tracks. If you are not satisfied with the content or experience within the first week of enrollment, you are eligible for a full refund.
            </p>

            <h2 style={{ color: "#fff", marginBottom: 24 }}>2. Eligibility Criteria</h2>
            <p style={{ color: "#94A3B8", lineHeight: 1.8, marginBottom: 40 }}>
              To be eligible for a refund, you must have completed less than 20% of the course content. Refunds are not applicable for discounted workshop enrollments or specialized bootcamp tracks.
            </p>

            <h2 style={{ color: "#fff", marginBottom: 24 }}>3. Process</h2>
            <p style={{ color: "#94A3B8", lineHeight: 1.8, marginBottom: 40 }}>
              Refund requests should be sent to billing@talentstack.com. Once approved, the refund will be processed to your original payment method within 5-7 business days.
            </p>

            <div style={{ 
              marginTop: 60, 
              paddingTop: 40, 
              borderTop: "1px solid rgba(255,255,255,0.1)",
              textAlign: "center",
              fontSize: "0.9rem",
              color: "#64748B"
            }}>
              Last updated: February 23, 2026. For billing inquiries, contact billing@talentstack.com
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
