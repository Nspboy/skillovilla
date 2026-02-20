import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/api';

const inputStyle = {
  width: "100%", 
  background: "rgba(255,255,255,0.05)", 
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12, 
  padding: "12px 16px", 
  color: "#fff", 
  fontSize: 15, 
  marginBottom: 14,
  outline: "none", 
  fontFamily: "inherit", 
  boxSizing: "border-box"
};

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const res = await authAPI.login({ email: form.email, password: form.password });
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else {
        const res = await authAPI.register(form);
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 64px)", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "linear-gradient(135deg, #0f0a1e 0%, #0d1a35 100%)", 
      padding: "40px 24px",
      position: "relative", 
      overflow: "hidden"
    }}>
      <div style={{ position: "absolute", top: "20%", left: "15%", width: 300, height: 300, background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "15%", width: 300, height: 300, background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)", borderRadius: "50%" }} />

      <div style={{
        width: "100%", 
        maxWidth: 440, 
        position: "relative", 
        zIndex: 1,
        background: "rgba(255,255,255,0.04)", 
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)", 
        borderRadius: 28, 
        padding: 40
      }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 800, color: "#fff", textAlign: "center", marginBottom: 8 }}>
          {isLogin ? "Welcome back" : "Start your journey"}
        </h2>
        <p style={{ color: "#64748b", textAlign: "center", marginBottom: 32 }}>
          {isLogin ? "Sign in to continue learning" : "Join 50,000+ students today"}
        </p>

        {error && (
          <div style={{ 
            background: "rgba(239,68,68,0.1)", 
            border: "1px solid rgba(239,68,68,0.3)", 
            color: "#ef4444", 
            padding: "12px", 
            borderRadius: 8, 
            marginBottom: 20, 
            fontSize: 14 
          }}>
            {error}
          </div>
        )}

        {/* Social Buttons */}
        {["Google", "LinkedIn"].map(provider => (
          <button 
            key={provider} 
            style={{
              width: "100%", 
              background: "rgba(255,255,255,0.05)", 
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e2e8f0", 
              padding: "12px", 
              borderRadius: 12, 
              fontSize: 14, 
              fontWeight: 600,
              cursor: "pointer", 
              fontFamily: "inherit", 
              marginBottom: 12, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: 10
            }}
          >
            <span>{provider === "Google" ? "🔵" : "🔷"}</span> Continue with {provider}
          </button>
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ color: "#475569", fontSize: 13 }}>or</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input 
              placeholder="Full Name" 
              value={form.name} 
              onChange={e => setForm({ ...form, name: e.target.value })} 
              style={inputStyle} 
              required
            />
          )}
          <input 
            type="email"
            placeholder="Email Address" 
            value={form.email} 
            onChange={e => setForm({ ...form, email: e.target.value })} 
            style={inputStyle} 
            required
          />
          {!isLogin && (
            <input 
              placeholder="Phone Number" 
              value={form.phone} 
              onChange={e => setForm({ ...form, phone: e.target.value })} 
              style={inputStyle} 
            />
          )}
          <div style={{ position: "relative", marginBottom: 24 }}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={form.password} 
              onChange={e => setForm({ ...form, password: e.target.value })} 
              style={{ ...inputStyle, marginBottom: 0, paddingRight: 45 }} 
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              width: "100%", 
              background: loading ? "rgba(139,92,246,0.5)" : "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              color: "#fff", 
              border: "none", 
              padding: "14px", 
              borderRadius: 12,
              fontSize: 16, 
              fontWeight: 700, 
              cursor: loading ? "not-allowed" : "pointer", 
              fontFamily: "inherit",
              boxShadow: "0 8px 32px rgba(139,92,246,0.4)"
            }}
          >
            {loading ? "Loading..." : (isLogin ? "Sign In →" : "Create Account →")}
          </button>
        </form>

        <p style={{ textAlign: "center", color: "#475569", fontSize: 14, marginTop: 20 }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => navigate(isLogin ? "/signup" : "/login")} 
            style={{ color: "#8b5cf6", cursor: "pointer", fontWeight: 600 }}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}
