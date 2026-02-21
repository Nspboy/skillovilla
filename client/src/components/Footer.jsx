export default function Footer() {
  return (
    <footer style={{
      background: "#0F172A", 
      color: "#94A3B8",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "80px 40px 40px"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1.5fr", gap: 30, marginBottom: 80 }}>
          {/* Brand Col */}
          <div style={{ paddingRight: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 10, 
                background: "linear-gradient(135deg, var(--primary), var(--secondary))", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                color: "#fff", 
                fontWeight: 900,
                fontSize: 20
              }}>
                T
              </div>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 22, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.5px" }}>TalentStack</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 30, color: "#94A3B8" }}>
              The career accelerator for the next generation of tech talent. Learn from the top 1% and land roles at the world's most innovative companies.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["LinkedIn", "YouTube", "Instagram", "Discord"].map(social => (
                <div 
                  key={social} 
                  style={{ 
                    width: 42, 
                    height: 42, 
                    borderRadius: 12, 
                    background: "rgba(255,255,255,0.06)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(255,255,255,0.05)"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "var(--primary)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  title={social}
                >
                  <span style={{ color: "#fff", fontSize: 14 }}>{social[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          {[
            { title: "Tracks", links: ["Data Science", "Business Analytics", "Product Management", "Digital Marketing"] },
            { title: "About Us", links: ["Our Story", "Success Stories", "Hiring Partners", "Careers"] },
            { title: "Resources", links: ["Blog", "Masterclasses", "Scholarship", "Community"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 28, fontFamily: "'Outfit', sans-serif" }}>
                {col.title}
              </h4>
              {col.links.map(link => (
                <div 
                  key={link} 
                  style={{ fontSize: 15, marginBottom: 14, cursor: "pointer", transition: "all 0.2s ease", color: "#94A3B8" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.paddingLeft = "4px";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "#94A3B8";
                    e.currentTarget.style.paddingLeft = "0";
                  }}
                >
                  {link}
                </div>
              ))}
            </div>
          ))}

          {/* Newsletter */}
          <div style={{ background: "rgba(255,255,255,0.03)", padding: 24, borderRadius: 20, border: "1px solid rgba(255,255,255,0.05)" }}>
            <h4 style={{ color: "#fff", fontSize: 17, fontWeight: 700, marginBottom: 16, fontFamily: "'Outfit', sans-serif" }}>Stay Updated</h4>
            <p style={{ fontSize: 14, color: "#94A3B8", marginBottom: 20, lineHeight: 1.6 }}>Subscribe to get the latest career tips and exclusive track discounts.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input 
                placeholder="Email Address" 
                style={{ 
                  background: "rgba(255,255,255,0.05)", 
                  border: "1px solid rgba(255,255,255,0.1)", 
                  borderRadius: 10, 
                  padding: "12px 16px", 
                  color: "#fff", 
                  fontSize: 14, 
                  width: "100%",
                  outline: "none",
                  transition: "border 0.2s"
                }} 
                onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"}
                onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              <button style={{ 
                background: "var(--primary)", 
                color: "#fff", 
                border: "none", 
                borderRadius: 10, 
                padding: "12px 20px", 
                fontWeight: 700, 
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >Join Newsletter</button>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: "1px solid rgba(255,255,255,0.05)", 
          paddingTop: 32, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          fontSize: 13
        }}>
          <span>
            © 2026 TalentStack. Made with ❤️ for the next generation of talent.
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
