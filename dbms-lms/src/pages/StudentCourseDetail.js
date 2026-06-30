import React, { useState } from "react";
import { s } from "../styles";

const TYPE_STYLE = {
  lecture:    { bg: "#00c2a822", color: "#00c2a8", icon: "📖" },
  quiz:       { bg: "#7b61ff22", color: "#7b61ff", icon: "❓" },
  lab:        { bg: "#f7a80022", color: "#f7a800", icon: "🔬" },
  assignment: { bg: "#e8454522", color: "#e84545", icon: "📝" },
  video:      { bg: "#00a9e022", color: "#00a9e0", icon: "🎥" },
};

export default function StudentCourseDetail({ course, onBack, onTakeQuiz, onToggleModule }) {
  const [tab, setTab] = useState("modules");
  const done = course.modules.filter(m => m.done).length;
  const progress = course.modules.length ? Math.round((done / course.modules.length) * 100) : 0;

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={onBack}>← Back to Courses</button>

      {/* Hero */}
      <div style={{ ...s.courseHero, borderBottom: `3px solid ${course.color}` }}>
        <div style={{ flex: 1 }}>
          <div style={{ ...s.levelBadge, background: course.color + "22", color: course.color, display: "inline-block", marginBottom: 10 }}>
            {course.level}
          </div>
          <h1 style={{ ...s.pageTitle, margin: 0 }}>{course.title}</h1>
          <p style={{ ...s.pageSubtitle, margin: "6px 0 10px" }}>
            👤 {course.instructor} &nbsp;·&nbsp; 🕐 {course.duration} &nbsp;·&nbsp; ◉ {course.enrolled} enrolled
          </p>
          <p style={{ color: "#888", maxWidth: 600, lineHeight: 1.6, marginBottom: 14 }}>{course.description}</p>
          <div style={s.progressWrap}>
            <div style={{ ...s.progressBar, width: 280, height: 8 }}>
              <div style={{ ...s.progressFill, width: `${progress}%`, background: course.color }} />
            </div>
            <span style={{ color: course.color, fontWeight: 700, fontSize: 13 }}>
              {progress}% complete ({done}/{course.modules.length})
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        {[
          { id: "modules", label: `▤ Modules (${course.modules.length})` },
          { id: "quizzes", label: `❓ Quizzes (${course.quizzes.length})` },
        ].map(t => (
          <button
            key={t.id}
            style={{ ...s.tab, ...(tab === t.id ? { ...s.tabActive, borderBottom: `2px solid ${course.color}`, color: course.color } : {}) }}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Modules */}
      {tab === "modules" && (
        <div>
          {course.modules.length === 0 ? (
            <div style={s.empty}>No modules in this course yet.</div>
          ) : (
            <>
              <div style={{ color: "#555", fontSize: 13, marginBottom: 16 }}>
                ✓ Check off modules as you complete them
              </div>
              {course.modules.map((mod, i) => {
                const ts = TYPE_STYLE[mod.type] || TYPE_STYLE.lecture;
                return (
                  <div key={mod.id} style={{ ...s.moduleRow, opacity: mod.done ? 0.55 : 1 }}>
                    <input
                      type="checkbox"
                      checked={mod.done}
                      onChange={() => onToggleModule(mod.id)}
                      style={{ width: 18, height: 18, accentColor: course.color, cursor: "pointer", flexShrink: 0 }}
                    />
                    <span style={s.modNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ ...s.modType, background: ts.bg, color: ts.color }}>{ts.icon} {mod.type}</span>
                    <span style={{ flex: 1, textDecoration: mod.done ? "line-through" : "none", color: mod.done ? "#555" : "#ddd", fontSize: 14 }}>
                      {mod.title}
                    </span>
                    {mod.done && <span style={{ color: "#00c2a8", fontSize: 13 }}>✓ Done</span>}
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {/* Quizzes */}
      {tab === "quizzes" && (
        <div>
          {course.quizzes.length === 0 ? (
            <div style={s.empty}>No quizzes in this course yet.</div>
          ) : (
            course.quizzes.map(q => (
              <div key={q.id} style={s.quizRow}>
                <div>
                  <div style={{ fontWeight: 700, color: "#eee", marginBottom: 4, fontSize: 15 }}>{q.title}</div>
                  <div style={{ color: "#666", fontSize: 13 }}>{q.questions.length} question{q.questions.length !== 1 ? "s" : ""}</div>
                </div>
                <button style={{ ...s.btn, ...s.btnPrimary, background: course.color, color: "#000" }} onClick={() => onTakeQuiz(q)}>
                  Take Quiz ▶
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
