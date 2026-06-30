import React from "react";
import { s } from "../styles";
import CourseCard from "../components/CourseCard";

export default function Dashboard({ courses, onSelectCourse, onAddCourse }) {
  const totalEnrolled = courses.reduce((a, c) => a + c.enrolled, 0);
  const totalQuizzes = courses.reduce((a, c) => a + c.quizzes.length, 0);
  const totalModules = courses.reduce((a, c) => a + c.modules.length, 0);
  const totalDone = courses.reduce((a, c) => a + c.modules.filter(m => m.done).length, 0);

  const stats = [
    { label: "Total Courses", value: courses.length, icon: "◈", color: "#00c2a8" },
    { label: "Total Enrolled", value: totalEnrolled, icon: "◉", color: "#f7a800" },
    { label: "Quizzes", value: totalQuizzes, icon: "❓", color: "#7b61ff" },
    { label: "Modules Done", value: `${totalDone}/${totalModules}`, icon: "✓", color: "#e84545" },
  ];

  return (
    <div style={s.page}>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Dashboard</h1>
          <p style={s.pageSubtitle}>Welcome back to your DBMS learning hub</p>
        </div>
        <button style={{ ...s.btn, ...s.btnPrimary }} onClick={onAddCourse}>+ New Course</button>
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

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ ...s.sectionTitle, margin: 0 }}>Recent Courses</h2>
        <span style={{ color: "#555", fontSize: 13 }}>{courses.length} total</span>
      </div>
      <div style={{ marginTop: 16 }}>
        {courses.length === 0 ? (
          <div style={s.empty}>No courses yet. Click "New Course" to get started!</div>
        ) : (
          <div style={s.courseGrid}>
            {courses.slice(0, 6).map(c => (
              <CourseCard key={c.id} course={c} onClick={() => onSelectCourse(c)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
