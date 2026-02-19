export default function Footer() {
  return (
    <footer style={{
      background: "#060609", 
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "48px 24px 24px"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ 
                width: 32, 
                height: 32, 
                borderRadius: 8, 
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                color: "#fff", 
                fontWeight: 900 
              }}>
                S
              </div>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>SkilloVilla</span>
            </div>
            <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              Transforming careers through live mentorship and guaranteed placement support.
            </p>
          </div>
          {[
            { title: "Platform", links: ["Courses", "Mentors", "Placements", "Blog"] },
            { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
            { title: "Legal", links: ["Privacy Policy", "Terms", "Refund Policy"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
                {col.title}
              </div>
              {col.links.map(link => (
                <div 
                  key={link} 
                  style={{ color: "#475569", fontSize: 14, marginBottom: 10, cursor: "pointer" }}
                >
                  {link}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ 
          borderTop: "1px solid rgba(255,255,255,0.05)", 
          paddingTop: 24, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center" 
        }}>
          <span style={{ color: "#334155", fontSize: 13 }}>
            © 2026 SkilloVilla. All rights reserved.
          </span>
          <span style={{ color: "#334155", fontSize: 13 }}>
            Made with ❤️ in India
          </span>
        </div>
      </div>
    </footer>
  );
}
