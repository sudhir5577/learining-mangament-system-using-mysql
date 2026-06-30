import React from "react";
import { s } from "../styles";

export default function CourseCard({ course, onClick, onDelete }) {
  const done = course.modules.filter(m => m.done).length;
  const progress = course.modules.length ? Math.round((done / course.modules.length) * 100) : 0;

  return (
    <div style={{ ...s.card, borderLeft: `4px solid ${course.color}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ ...s.levelBadge, background: course.color + "22", color: course.color }}>
          {course.level}
        </div>
        {onDelete && (
          <button style={s.deleteBtn} title="Delete course" onClick={e => { e.stopPropagation(); onDelete(); }}>✕</button>
        )}
      </div>

      <div style={s.cardTitle} onClick={onClick}>{course.title}</div>
      <div style={s.cardInstructor}>👤 {course.instructor}</div>
      <div style={s.cardDesc}>{course.description}</div>

      <div style={s.cardMeta}>
        <span>🕐 {course.duration}</span>
        <span>◉ {course.enrolled} enrolled</span>
        <span>❓ {course.quizzes.length} quiz{course.quizzes.length !== 1 ? "zes" : ""}</span>
        <span>▤ {course.modules.length} modules</span>
      </div>

      <div style={s.progressWrap}>
        <div style={s.progressBar}>
          <div style={{ ...s.progressFill, width: `${progress}%`, background: course.color }} />
        </div>
        <span style={{ color: course.color, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>{progress}%</span>
      </div>

      <button
        style={{ ...s.btn, ...s.btnPrimary, width: "100%", marginTop: 14, background: course.color, color: "#000" }}
        onClick={onClick}
      >
        Open Course →
      </button>
    </div>
  );
}
