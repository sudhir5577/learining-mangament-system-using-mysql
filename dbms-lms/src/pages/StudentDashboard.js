import React, { useState } from "react";
import { s } from "../styles";

export default function StudentDashboard({ courses, user, onSelectCourse, onViewCourses }) {
  const totalQuizzes = courses.reduce((a, c) => a + c.quizzes.length, 0);
  const totalModules = courses.reduce((a, c) => a + c.modules.length, 0);
  const totalDone = courses.reduce((a, c) => a + c.modules.filter(m => m.done).length, 0);

  const stats = [
    { label: "Available Courses", value: courses.length, icon: "◈", color: "#00c2a8" },
    { label: "Total Modules", value: totalModules, icon: "▤", color: "#f7a800" },
    { label: "Quizzes", value: totalQuizzes, icon: "❓", color: "#7b61ff" },
    { label: "Progress", value: `${totalDone}/${totalModules}`, icon: "✓", color: "#e84545" },
  ];

  return (
    <div style={s.page}>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Hello, {user.name.split(" ")[0]} 👋</h1>
          <p style={s.pageSubtitle}>Here's what's available for you to learn today</p>
        </div>
        <button style={{ ...s.btn, ...s.btnPrimary }} onClick={onViewCourses}>Browse Courses →</button>
      </div>

      <div style={s.statsRow}>
        {stats.map(stat => (
          <div key={stat.label} style={{ ...s.statCard, borderTop: `3px solid ${stat.color}` }}>
            <span style={{ fontSize: 26, marginBottom: 8, display: "block" }}>{stat.icon}</span>
            <div style={{ ...s.statCardNum, color: stat.color }}>{stat.value}</div>
            <div style={s.statCardLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      <h2 style={s.sectionTitle}>Continue Learning</h2>
      {courses.length === 0 ? (
        <div style={s.empty}>No courses available yet.</div>
      ) : (
        <div style={s.courseGrid}>
          {courses.slice(0, 6).map(c => <StudentCourseCard key={c.id} course={c} onClick={() => onSelectCourse(c)} />)}
        </div>
      )}
    </div>
  );
}

export function StudentCourseCard({ course, onClick }) {
  const done = course.modules.filter(m => m.done).length;
  const progress = course.modules.length ? Math.round((done / course.modules.length) * 100) : 0;

  return (
    <div style={{ ...s.card, borderLeft: `4px solid ${course.color}` }}>
      <div style={{ ...s.levelBadge, background: course.color + "22", color: course.color }}>{course.level}</div>
      <div style={s.cardTitle} onClick={onClick}>{course.title}</div>
      <div style={s.cardInstructor}>👤 {course.instructor}</div>
      <div style={s.cardDesc}>{course.description}</div>
      <div style={s.cardMeta}>
        <span>🕐 {course.duration}</span>
        <span>▤ {course.modules.length} modules</span>
        <span>❓ {course.quizzes.length} quizzes</span>
      </div>
      <div style={s.progressWrap}>
        <div style={s.progressBar}>
          <div style={{ ...s.progressFill, width: `${progress}%`, background: course.color }} />
        </div>
        <span style={{ color: course.color, fontSize: 12, fontWeight: 700 }}>{progress}%</span>
      </div>
      <button style={{ ...s.btn, ...s.btnPrimary, width: "100%", marginTop: 14, background: course.color, color: "#000" }} onClick={onClick}>
        {progress > 0 ? "Continue →" : "Start Course →"}
      </button>
    </div>
  );
}
