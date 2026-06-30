import React, { useState, useEffect } from "react";
import { s } from "./styles";

// Auth
import LoginPage from "./pages/LoginPage";

// Shared
import { AddCourseModal, AddModuleModal, AddQuizModal, DeleteConfirmModal } from "./components/Modals";
import QuizView from "./pages/QuizView";

// Teacher views
import Dashboard from "./pages/Dashboard";
import CourseList from "./pages/CourseList";
import CourseDetail from "./pages/CourseDetail";

// Student views
import StudentDashboard from "./pages/StudentDashboard";
import StudentCourseList from "./pages/StudentCourseList";
import StudentCourseDetail from "./pages/StudentCourseDetail";

const API = "http://localhost:4000/api";

export default function App() {
  const [user, setUser]               = useState(null);
  const [courses, setCourses]         = useState([]);
  const [loading, setLoading]         = useState(false);
  const [view, setView]               = useState("dashboard");
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeQuiz, setActiveQuiz]   = useState(null);

  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddModule, setShowAddModule] = useState(false);
  const [showAddQuiz, setShowAddQuiz]     = useState(false);
  const [deleteTarget, setDeleteTarget]   = useState(null);

  const [quizState, setQuizState] = useState({ answers: {}, submitted: false, score: 0 });

  const [notification, setNotification] = useState(null);
  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/courses`);
      const data = await res.json();
      setCourses(data);
    } catch {
      notify("Could not connect to database.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (user) loadCourses(); }, [user]); // eslint-disable-line

  useEffect(() => {
    if (activeCourse) {
      const updated = courses.find(c => c.id === activeCourse.id);
      if (updated) setActiveCourse(updated);
    }
  }, [courses]); // eslint-disable-line

  const handleLogin  = (u) => { setUser(u); setView("dashboard"); setActiveCourse(null); };
  const handleLogout = () => { setUser(null); setView("dashboard"); setActiveCourse(null); setActiveQuiz(null); setCourses([]); };

  const addCourse = async (data) => {
    try {
      const res = await fetch(`${API}/courses`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const newCourse = await res.json();
      setCourses(p => [newCourse, ...p]);
      setShowAddCourse(false);
      notify("Course created!");
    } catch { notify("Failed to create course.", "error"); }
  };

  const deleteCourse = async (id) => {
    try {
      await fetch(`${API}/courses/${id}`, { method: "DELETE" });
      setCourses(p => p.filter(c => c.id !== id));
      if (activeCourse?.id === id) { setActiveCourse(null); setView("courses"); }
      setDeleteTarget(null);
      notify("Course deleted.", "info");
    } catch { notify("Failed to delete course.", "error"); }
  };

  const addModule = async (courseId, mod) => {
    try {
      const res = await fetch(`${API}/courses/${courseId}/modules`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(mod) });
      const newMod = await res.json();
      setCourses(p => p.map(c => c.id === courseId ? { ...c, modules: [...c.modules, newMod] } : c));
      setShowAddModule(false);
      notify("Module added!");
    } catch { notify("Failed to add module.", "error"); }
  };

  const deleteModule = async (courseId, modId) => {
    try {
      await fetch(`${API}/modules/${modId}`, { method: "DELETE" });
      setCourses(p => p.map(c => c.id === courseId ? { ...c, modules: c.modules.filter(m => m.id !== modId) } : c));
      notify("Module removed.", "info");
    } catch { notify("Failed to delete module.", "error"); }
  };

  const toggleModule = async (courseId, modId) => {
    try {
      const res = await fetch(`${API}/modules/${modId}/toggle`, { method: "PATCH" });
      const updated = await res.json();
      setCourses(p => p.map(c => c.id === courseId ? { ...c, modules: c.modules.map(m => m.id === modId ? updated : m) } : c));
    } catch { notify("Failed to update module.", "error"); }
  };

  const addQuiz = async (courseId, quiz) => {
    try {
      const res = await fetch(`${API}/courses/${courseId}/quizzes`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(quiz) });
      const newQuiz = await res.json();
      setCourses(p => p.map(c => c.id === courseId ? { ...c, quizzes: [...c.quizzes, newQuiz] } : c));
      setShowAddQuiz(false);
      notify("Quiz added!");
    } catch { notify("Failed to add quiz.", "error"); }
  };

  const deleteQuiz = async (courseId, quizId) => {
    try {
      await fetch(`${API}/quizzes/${quizId}`, { method: "DELETE" });
      setCourses(p => p.map(c => c.id === courseId ? { ...c, quizzes: c.quizzes.filter(q => q.id !== quizId) } : c));
      notify("Quiz removed.", "info");
    } catch { notify("Failed to delete quiz.", "error"); }
  };

  const openCourse = (course) => { setActiveCourse(course); setView("courseDetail"); };
  const openQuiz   = (quiz)   => { setActiveQuiz(quiz); setQuizState({ answers: {}, submitted: false, score: 0 }); setView("quiz"); };
  const goTo       = (page)   => { setView(page); setActiveCourse(null); };

  if (!user) return <LoginPage onLogin={handleLogin} />;

  const isTeacher = user.role === "teacher";
  const NAV = isTeacher
    ? [{ id: "dashboard", icon: "⊞", label: "Dashboard" }, { id: "courses", icon: "◈", label: "All Courses" }]
    : [{ id: "dashboard", icon: "⊞", label: "My Learning" }, { id: "courses", icon: "◈", label: "Browse Courses" }];

  return (
    <div style={s.app}>
      <div style={s.bgGrid} />

      {showAddCourse && <AddCourseModal onAdd={addCourse} onClose={() => setShowAddCourse(false)} />}
      {showAddModule && activeCourse && <AddModuleModal onAdd={(m) => addModule(activeCourse.id, m)} onClose={() => setShowAddModule(false)} />}
      {showAddQuiz && activeCourse && <AddQuizModal onAdd={(q) => addQuiz(activeCourse.id, q)} onClose={() => setShowAddQuiz(false)} />}
      {deleteTarget && <DeleteConfirmModal message="Delete this course? All modules and quizzes will be lost." onConfirm={() => deleteCourse(deleteTarget)} onCancel={() => setDeleteTarget(null)} />}

      {notification && (
        <div style={{ ...s.notification, background: notification.type === "success" ? "#00c2a8" : notification.type === "error" ? "#e84545" : "#f7a800" }}>
          {notification.type === "success" ? "✓" : notification.type === "error" ? "✗" : "ℹ"} {notification.msg}
        </div>
      )}

      <aside style={s.sidebar}>
        <div style={s.logo}>
          <span style={s.logoIcon}>⬡</span>
          <div>
            <div style={s.logoText}>QueryLearn</div>
            <div style={s.logoSub}>DBMS Academy</div>
          </div>
        </div>

        <div style={{ background: isTeacher ? "#00c2a809" : "#7b61ff09", border: `1px solid ${isTeacher ? "#00c2a820" : "#7b61ff20"}`, borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: user.color + "33", color: user.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, flexShrink: 0 }}>
            {user.avatar}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ color: "#ddd", fontWeight: 700, fontSize: 13, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
            <div style={{ color: isTeacher ? "#00c2a8" : "#7b61ff", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {isTeacher ? "👨‍🏫 Teacher" : "🎓 Student"}
            </div>
          </div>
        </div>

        <nav style={s.nav}>
          {NAV.map(item => (
            <button key={item.id}
              style={{ ...s.navBtn, ...(view === item.id || (view === "courseDetail" && item.id === "courses") || (view === "quiz" && item.id === "courses") ? s.navBtnActive : {}) }}
              onClick={() => goTo(item.id)}>
              <span style={s.navIcon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={s.sidebarStats}>
            <div style={s.statBox}>
              <span style={s.statNum}>{courses.length}</span>
              <span style={s.statLabel}>Courses</span>
            </div>
            <div style={s.statBox}>
              <span style={s.statNum}>{courses.reduce((a, c) => a + c.quizzes.length, 0)}</span>
              <span style={s.statLabel}>Quizzes</span>
            </div>
          </div>

          <div style={{ background: "#0c0c1a", border: "1px solid #1a1a2e", borderRadius: 8, padding: "6px 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: loading ? "#f7a800" : "#00c2a8", flexShrink: 0, boxShadow: loading ? "0 0 6px #f7a800" : "0 0 6px #00c2a8" }} />
            <span style={{ color: "#555", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>
              {loading ? "Syncing..." : "MySQL Connected"}
            </span>
          </div>

          <button style={{ ...s.btn, background: "#0c0c1a", border: "1px solid #1a1a2e", color: "#666", width: "100%", marginTop: 2 }} onClick={handleLogout}>
            ⎋ Sign Out
          </button>
        </div>
      </aside>

      <main style={s.main}>
        {isTeacher && view === "dashboard" && <Dashboard courses={courses} onSelectCourse={openCourse} onAddCourse={() => setShowAddCourse(true)} />}
        {isTeacher && view === "courses" && <CourseList courses={courses} onSelectCourse={openCourse} onAddCourse={() => setShowAddCourse(true)} onDeleteCourse={(id) => setDeleteTarget(id)} />}
        {isTeacher && view === "courseDetail" && activeCourse && (
          <CourseDetail course={activeCourse} onBack={() => setView("courses")} onDeleteCourse={(id) => setDeleteTarget(id)}
            onAddModule={() => setShowAddModule(true)} onDeleteModule={(mid) => deleteModule(activeCourse.id, mid)}
            onToggleModule={(mid) => toggleModule(activeCourse.id, mid)} onAddQuiz={() => setShowAddQuiz(true)}
            onDeleteQuiz={(qid) => deleteQuiz(activeCourse.id, qid)} onTakeQuiz={openQuiz} />
        )}

        {!isTeacher && view === "dashboard" && <StudentDashboard courses={courses} user={user} onSelectCourse={openCourse} onViewCourses={() => goTo("courses")} />}
        {!isTeacher && view === "courses" && <StudentCourseList courses={courses} onSelectCourse={openCourse} />}
        {!isTeacher && view === "courseDetail" && activeCourse && (
          <StudentCourseDetail course={activeCourse} onBack={() => setView("courses")}
            onTakeQuiz={openQuiz} onToggleModule={(mid) => toggleModule(activeCourse.id, mid)} />
        )}

        {view === "quiz" && activeQuiz && (
          <QuizView quiz={activeQuiz} quizState={quizState} setQuizState={setQuizState} onBack={() => setView("courseDetail")} />
        )}
      </main>
    </div>
  );
}
