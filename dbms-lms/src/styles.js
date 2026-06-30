export const s = {
  app: { display: "flex", minHeight: "100vh", background: "#0c0c1a", color: "#eee", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", position: "relative", overflow: "hidden" },
  bgGrid: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(0,194,168,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,168,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 },

  // Sidebar
  sidebar: { width: 240, background: "#08081a", borderRight: "1px solid #1a1a2e", padding: "28px 20px", display: "flex", flexDirection: "column", gap: 24, position: "sticky", top: 0, height: "100vh", zIndex: 10, flexShrink: 0 },
  logo: { display: "flex", alignItems: "center", gap: 12 },
  logoIcon: { fontSize: 32, color: "#00c2a8" },
  logoText: { fontWeight: 900, fontSize: 18, color: "#fff", letterSpacing: "-0.5px" },
  logoSub: { fontSize: 11, color: "#555", letterSpacing: "1px", textTransform: "uppercase" },
  nav: { display: "flex", flexDirection: "column", gap: 6 },
  navBtn: { background: "none", border: "none", color: "#666", padding: "10px 14px", borderRadius: 8, cursor: "pointer", textAlign: "left", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s", width: "100%" },
  navBtnActive: { background: "#00c2a811", color: "#00c2a8", borderLeft: "3px solid #00c2a8" },
  navIcon: { fontSize: 16 },
  sidebarStats: { marginTop: "auto", display: "flex", gap: 8 },
  statBox: { flex: 1, background: "#0f0f20", borderRadius: 10, padding: "12px 10px", textAlign: "center", border: "1px solid #1a1a2e" },
  statNum: { display: "block", fontWeight: 900, fontSize: 22, color: "#00c2a8" },
  statLabel: { fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.5px" },

  // Main layout
  main: { flex: 1, overflowY: "auto", position: "relative", zIndex: 1 },
  page: { padding: "40px 44px", maxWidth: 980, margin: "0 auto" },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 },
  pageTitle: { fontSize: 32, fontWeight: 900, color: "#fff", margin: "0 0 4px 0", letterSpacing: "-1px" },
  pageSubtitle: { color: "#666", fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: 800, color: "#ccc", margin: "32px 0 16px", letterSpacing: "-0.5px" },

  // Stats cards
  statsRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 },
  statCard: { background: "#0f0f20", borderRadius: 12, padding: "20px", border: "1px solid #1a1a2e" },
  statCardNum: { fontSize: 36, fontWeight: 900 },
  statCardLabel: { color: "#666", fontSize: 12, textTransform: "uppercase", letterSpacing: "1px", marginTop: 4 },

  // Course grid
  courseGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 },
  card: { background: "#0f0f20", borderRadius: 14, padding: 22, border: "1px solid #1a1a2e", transition: "transform 0.2s, box-shadow 0.2s" },
  cardTitle: { fontSize: 17, fontWeight: 800, color: "#fff", margin: "12px 0 6px", cursor: "pointer", lineHeight: 1.3 },
  cardInstructor: { color: "#888", fontSize: 13, marginBottom: 8 },
  cardDesc: { color: "#666", fontSize: 13, lineHeight: 1.5, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
  cardMeta: { display: "flex", gap: 12, flexWrap: "wrap", color: "#555", fontSize: 12, marginBottom: 12 },
  levelBadge: { fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.5px" },
  progressWrap: { display: "flex", alignItems: "center", gap: 10, marginTop: 4 },
  progressBar: { flex: 1, height: 6, background: "#1a1a2e", borderRadius: 10, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 10, transition: "width 0.4s ease" },

  // Buttons
  btn: { border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontWeight: 700, fontSize: 13, transition: "opacity 0.2s, transform 0.1s", color: "#fff", fontFamily: "inherit" },
  btnPrimary: { background: "#00c2a8", color: "#000" },
  btnDanger: { background: "#e84545" },
  deleteBtn: { background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16, padding: "4px 6px", borderRadius: 4, lineHeight: 1 },

  // Search
  searchInput: { width: "100%", background: "#0f0f20", border: "1px solid #1a1a2e", borderRadius: 10, padding: "12px 18px", color: "#eee", fontSize: 14, marginBottom: 24, boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
  empty: { color: "#555", textAlign: "center", padding: "48px 0", fontSize: 15 },

  // Course detail
  courseHero: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, paddingBottom: 28, marginBottom: 28 },
  backBtn: { background: "none", border: "none", color: "#00c2a8", cursor: "pointer", fontSize: 14, fontWeight: 700, padding: "0 0 20px 0", display: "block", fontFamily: "inherit" },
  tabs: { display: "flex", gap: 4, borderBottom: "1px solid #1a1a2e", marginBottom: 24 },
  tab: { background: "none", border: "none", borderBottom: "2px solid transparent", color: "#666", padding: "10px 20px", cursor: "pointer", fontWeight: 700, fontSize: 14, transition: "all 0.2s", fontFamily: "inherit" },
  tabActive: { color: "#00c2a8" },

  // Modules
  moduleRow: { display: "flex", alignItems: "center", gap: 14, background: "#0f0f20", border: "1px solid #1a1a2e", borderRadius: 10, padding: "14px 18px", marginBottom: 10 },
  modNum: { color: "#555", fontWeight: 700, fontSize: 13, width: 28 },
  modType: { fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, textTransform: "uppercase" },

  // Quizzes
  quizRow: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0f0f20", border: "1px solid #1a1a2e", borderRadius: 12, padding: "16px 20px", marginBottom: 12 },
  questionCard: { background: "#0f0f20", border: "1px solid #1a1a2e", borderRadius: 14, padding: "20px 24px", marginBottom: 16 },
  questionTitle: { fontSize: 16, fontWeight: 700, color: "#fff" },
  optionBtn: { width: "100%", border: "1px solid #333", borderRadius: 8, padding: "12px 16px", textAlign: "left", color: "#ccc", fontSize: 14, display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s", fontFamily: "inherit" },
  optionLetter: { width: 24, height: 24, borderRadius: "50%", background: "#1e1e3a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 },
  scoreCard: { background: "#0f0f20", border: "2px solid", borderRadius: 16, padding: "28px", textAlign: "center", marginBottom: 28 },

  // Modals
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(4px)" },
  modal: { background: "#0f0f20", border: "1px solid #1a1a2e", borderRadius: 16, padding: 32, width: "90%", maxWidth: 520, boxShadow: "0 24px 80px rgba(0,0,0,0.6)" },
  modalTitle: { fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 24, letterSpacing: "-0.5px" },
  formGrid: { display: "flex", flexDirection: "column", gap: 12 },
  label: { fontSize: 12, color: "#777", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2, display: "block" },
  input: { background: "#12121f", border: "1px solid #222", borderRadius: 8, padding: "10px 14px", color: "#eee", fontSize: 14, width: "100%", boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
  textarea: { background: "#12121f", border: "1px solid #222", borderRadius: 8, padding: "10px 14px", color: "#eee", fontSize: 14, width: "100%", boxSizing: "border-box", outline: "none", fontFamily: "inherit", resize: "vertical", height: 80 },
  select: { background: "#12121f", border: "1px solid #222", borderRadius: 8, padding: "10px 14px", color: "#eee", fontSize: 14, width: "100%", boxSizing: "border-box", outline: "none", fontFamily: "inherit", cursor: "pointer" },

  // Notification
  notification: { position: "fixed", top: 24, right: 24, padding: "12px 20px", borderRadius: 10, color: "#000", fontWeight: 700, fontSize: 14, zIndex: 200, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" },
};
