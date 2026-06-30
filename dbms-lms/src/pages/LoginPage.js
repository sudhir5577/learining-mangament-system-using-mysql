import React, { useState } from "react";

const API = "http://localhost:4000/api";

const DEMO_USERS = {
  teacher: [
    { name: "Dr. Ananya Sharma", email: "ananya@dbms.edu",  avatar: "AS", color: "#00c2a8" },
    { name: "Prof. Rajiv Mehta",  email: "rajiv@dbms.edu",  avatar: "RM", color: "#f7a800" },
    { name: "Dr. Priya Nair",     email: "priya@dbms.edu",  avatar: "PN", color: "#e84545" },
  ],
  student: [
    { name: "Sudhir Kumar", email: "sudhir@student.edu", avatar: "SK", color: "#7b61ff" },
    { name: "Meera Reddy",  email: "meera@student.edu",  avatar: "MR", color: "#00a9e0" },
    { name: "Arjun Singh",  email: "arjun@student.edu",  avatar: "AS", color: "#ff6b6b" },
  ],
};

export default function LoginPage({ onLogin }) {
  const [tab, setTab]         = useState("student");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res  = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: tab }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Login failed."); setLoading(false); return; }
      onLogin(data);
    } catch {
      setError("Cannot reach server. Make sure the backend is running on port 4000.");
      setLoading(false);
    }
  };

  const fillDemo = (u) => { setEmail(u.email); setPassword(tab + "123"); setError(""); };

  return (
    <div style={styles.page}>
      <div style={styles.bg} />
      <div style={styles.bgGrid} />

      <div style={styles.leftPanel}>
        <div style={styles.brand}>
          <span style={styles.brandIcon}>⬡</span>
          <div>
            <div style={styles.brandName}>QueryLearn</div>
            <div style={styles.brandSub}>DBMS Academy</div>
          </div>
        </div>
        <div style={styles.heroText}>
          <div style={styles.heroTitle}>Master Database Systems</div>
          <div style={styles.heroSubtitle}>
            Interactive courses, quizzes, and progress tracking for DBMS learners and educators.
          </div>
        </div>
        <div style={styles.features}>
          {[
            { icon: "◈", text: "Structured DBMS courses" },
            { icon: "❓", text: "Interactive quizzes" },
            { icon: "▤", text: "Module-by-module progress" },
            { icon: "◉", text: "Teacher & student dashboards" },
            { icon: "🗄", text: "MySQL-backed persistence" },
          ].map(f => (
            <div key={f.text} style={styles.featureItem}>
              <span style={styles.featureIcon}>{f.icon}</span>
              <span style={styles.featureText}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Welcome back</div>
          <div style={styles.cardSub}>Sign in to your account</div>

          <div style={styles.roleTabs}>
            {["student", "teacher"].map(role => (
              <button key={role}
                style={{ ...styles.roleTab, ...(tab === role ? styles.roleTabActive : {}) }}
                onClick={() => { setTab(role); setEmail(""); setPassword(""); setError(""); }}>
                {role === "student" ? "🎓 Student" : "👨‍🏫 Teacher"}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input style={styles.input} type="email"
                placeholder={`your@${tab === "teacher" ? "dbms.edu" : "student.edu"}`}
                value={email} onChange={e => setEmail(e.target.value)} required autoComplete="off" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <div style={{ position: "relative" }}>
                <input style={{ ...styles.input, paddingRight: 44 }}
                  type={showPass ? "text" : "password"} placeholder="Enter your password"
                  value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" style={styles.eyeBtn} onClick={() => setShowPass(p => !p)} tabIndex={-1}>
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {error && <div style={styles.errorBox}>{error}</div>}

            <button type="submit" style={{ ...styles.loginBtn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
              {loading ? "Signing in..." : `Sign in as ${tab === "student" ? "Student" : "Teacher"}`}
            </button>
          </form>

          <div style={styles.demoSection}>
            <div style={styles.demoTitle}>
              <span style={styles.demoDivider} />
              Quick Demo Login
              <span style={styles.demoDivider} />
            </div>
            <div style={styles.demoList}>
              {DEMO_USERS[tab].map(u => (
                <button key={u.email} style={styles.demoBtn} onClick={() => fillDemo(u)}>
                  <div style={{ ...styles.demoAvatar, background: u.color + "33", color: u.color }}>{u.avatar}</div>
                  <div style={styles.demoInfo}>
                    <div style={styles.demoName}>{u.name}</div>
                    <div style={styles.demoEmail}>{u.email}</div>
                  </div>
                  <span style={styles.demoArrow}>→</span>
                </button>
              ))}
            </div>
            <div style={styles.demoHint}>Password for all demo accounts: <code style={styles.code}>{tab}123</code></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", minHeight: "100vh", background: "#0c0c1a", position: "relative", overflow: "hidden" },
  bg: { position: "fixed", inset: 0, background: "radial-gradient(ellipse 80% 60% at 20% 50%, #00c2a808 0%, transparent 70%)", pointerEvents: "none" },
  bgGrid: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(0,194,168,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,168,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" },
  leftPanel: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 64px", gap: 40, borderRight: "1px solid #1a1a2e" },
  brand: { display: "flex", alignItems: "center", gap: 14 },
  brandIcon: { fontSize: 38, color: "#00c2a8" },
  brandName: { fontFamily: "'DM Sans', sans-serif", fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: "-0.5px" },
  brandSub: { fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "1.5px" },
  heroText: { maxWidth: 420 },
  heroTitle: { fontFamily: "'DM Sans', sans-serif", fontWeight: 900, fontSize: 42, color: "#fff", lineHeight: 1.15, letterSpacing: "-1.5px", marginBottom: 16 },
  heroSubtitle: { fontFamily: "'DM Sans', sans-serif", color: "#666", fontSize: 16, lineHeight: 1.7 },
  features: { display: "flex", flexDirection: "column", gap: 14 },
  featureItem: { display: "flex", alignItems: "center", gap: 14 },
  featureIcon: { width: 36, height: 36, background: "#00c2a811", border: "1px solid #00c2a822", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#00c2a8", flexShrink: 0 },
  featureText: { fontFamily: "'DM Sans', sans-serif", color: "#888", fontSize: 14 },
  rightPanel: { width: 480, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 48px" },
  card: { width: "100%", background: "#0f0f20", border: "1px solid #1a1a2e", borderRadius: 20, padding: "36px 32px", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" },
  cardTitle: { fontFamily: "'DM Sans', sans-serif", fontWeight: 900, fontSize: 26, color: "#fff", marginBottom: 4, letterSpacing: "-0.5px" },
  cardSub: { fontFamily: "'DM Sans', sans-serif", color: "#555", fontSize: 14, marginBottom: 28 },
  roleTabs: { display: "flex", background: "#080818", borderRadius: 10, padding: 4, marginBottom: 24, border: "1px solid #1a1a2e" },
  roleTab: { flex: 1, border: "none", background: "none", color: "#555", padding: "10px", borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, transition: "all 0.2s" },
  roleTabActive: { background: "#00c2a8", color: "#000" },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#777", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" },
  input: { background: "#12121f", border: "1px solid #1e1e3a", borderRadius: 10, padding: "12px 16px", color: "#eee", fontSize: 14, outline: "none", fontFamily: "'DM Sans', sans-serif", transition: "border 0.2s", width: "100%", boxSizing: "border-box" },
  eyeBtn: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 4 },
  errorBox: { background: "#e8454518", border: "1px solid #e84545", borderRadius: 8, padding: "10px 14px", color: "#e84545", fontSize: 13, fontFamily: "'DM Sans', sans-serif" },
  loginBtn: { background: "#00c2a8", color: "#000", border: "none", borderRadius: 10, padding: "14px", fontWeight: 900, fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", marginTop: 4, transition: "opacity 0.2s, transform 0.1s", letterSpacing: "-0.3px" },
  demoSection: { marginTop: 28 },
  demoTitle: { display: "flex", alignItems: "center", gap: 10, color: "#444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 14 },
  demoDivider: { flex: 1, height: 1, background: "#1a1a2e" },
  demoList: { display: "flex", flexDirection: "column", gap: 8 },
  demoBtn: { display: "flex", alignItems: "center", gap: 12, background: "#080818", border: "1px solid #1a1a2e", borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "border 0.2s, background 0.2s", width: "100%" },
  demoAvatar: { width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, flexShrink: 0, fontFamily: "'DM Sans', sans-serif" },
  demoInfo: { flex: 1, textAlign: "left" },
  demoName: { fontFamily: "'DM Sans', sans-serif", color: "#ccc", fontWeight: 700, fontSize: 13 },
  demoEmail: { fontFamily: "'DM Sans', sans-serif", color: "#555", fontSize: 12 },
  demoArrow: { color: "#333", fontSize: 16 },
  demoHint: { marginTop: 12, color: "#444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textAlign: "center" },
  code: { background: "#1a1a2e", color: "#00c2a8", padding: "2px 8px", borderRadius: 4, fontSize: 12 },
};
