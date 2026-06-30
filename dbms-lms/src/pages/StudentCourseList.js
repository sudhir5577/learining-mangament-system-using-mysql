import React, { useState } from "react";
import { s } from "../styles";
import { StudentCourseCard } from "./StudentDashboard";

export default function StudentCourseList({ courses, onSelectCourse }) {
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("All");

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchLevel = filterLevel === "All" || c.level === filterLevel;
    return matchSearch && matchLevel;
  });

  return (
    <div style={s.page}>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Browse Courses</h1>
          <p style={s.pageSubtitle}>{courses.length} course{courses.length !== 1 ? "s" : ""} available</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <input
          style={{ ...s.searchInput, flex: 1, marginBottom: 0 }}
          placeholder="🔍  Search courses or instructors..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          style={{ ...s.select, width: 150 }}
          value={filterLevel}
          onChange={e => setFilterLevel(e.target.value)}
        >
          {["All", "Beginner", "Intermediate", "Advanced"].map(l => <option key={l}>{l}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div style={s.empty}>No courses match your search.</div>
      ) : (
        <div style={s.courseGrid}>
          {filtered.map(c => (
            <StudentCourseCard key={c.id} course={c} onClick={() => onSelectCourse(c)} />
          ))}
        </div>
      )}
    </div>
  );
}
