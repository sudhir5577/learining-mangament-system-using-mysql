import React, { useState } from "react";
import { s } from "../styles";
import { LEVELS, COLORS, uid } from "../data";

// ── Add Course Modal ──────────────────────────────────────────────────────────
export function AddCourseModal({ onAdd, onClose }) {
  const [form, setForm] = useState({
    title: "", instructor: "", description: "", duration: "", level: "Beginner", color: COLORS[0],
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const valid = form.title && form.instructor && form.description && form.duration;

  return (
    <div style={s.modalOverlay}>
      <div style={s.modal}>
        <div style={s.modalTitle}>+ New Course</div>
        <div style={s.formGrid}>
          <div>
            <label style={s.label}>Course Title *</label>
            <input style={s.input} value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Advanced SQL Techniques" />
          </div>
          <div>
            <label style={s.label}>Instructor *</label>
            <input style={s.input} value={form.instructor} onChange={e => set("instructor", e.target.value)} placeholder="e.g. Dr. John Doe" />
          </div>
          <div>
            <label style={s.label}>Description *</label>
            <textarea style={s.textarea} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Brief course description..." />
          </div>
          <div>
            <label style={s.label}>Duration *</label>
            <input style={s.input} value={form.duration} onChange={e => set("duration", e.target.value)} placeholder="e.g. 4 weeks" />
          </div>
          <div>
            <label style={s.label}>Level</label>
            <select style={s.select} value={form.level} onChange={e => set("level", e.target.value)}>
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label style={s.label}>Card Color</label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
              {COLORS.map(c => (
                <div key={c} onClick={() => set("color", c)} style={{ width: 32, height: 32, borderRadius: "50%", background: c, cursor: "pointer", border: form.color === c ? "3px solid white" : "3px solid transparent", transition: "border 0.2s" }} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button style={{ ...s.btn, ...s.btnPrimary, flex: 1, opacity: valid ? 1 : 0.5 }} disabled={!valid} onClick={() => onAdd(form)}>Create Course</button>
          <button style={{ ...s.btn, background: "#222", flex: 1 }} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── Add Module Modal ──────────────────────────────────────────────────────────
export function AddModuleModal({ onAdd, onClose }) {
  const [form, setForm] = useState({ title: "", type: "lecture" });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div style={s.modalOverlay}>
      <div style={{ ...s.modal, maxWidth: 420 }}>
        <div style={s.modalTitle}>+ Add Module</div>
        <div style={s.formGrid}>
          <div>
            <label style={s.label}>Module Title *</label>
            <input style={s.input} value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Introduction to Joins" />
          </div>
          <div>
            <label style={s.label}>Type</label>
            <select style={s.select} value={form.type} onChange={e => set("type", e.target.value)}>
              <option value="lecture">📖 Lecture</option>
              <option value="quiz">❓ Quiz</option>
              <option value="lab">🔬 Lab</option>
              <option value="assignment">📝 Assignment</option>
              <option value="video">🎥 Video</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button style={{ ...s.btn, ...s.btnPrimary, flex: 1, opacity: form.title ? 1 : 0.5 }} disabled={!form.title} onClick={() => onAdd(form)}>Add Module</button>
          <button style={{ ...s.btn, background: "#222", flex: 1 }} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── Add Quiz Modal ────────────────────────────────────────────────────────────
export function AddQuizModal({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { id: uid(), question: "", options: ["", "", "", ""], answer: 0 },
  ]);

  const addQ = () => setQuestions(p => [...p, { id: uid(), question: "", options: ["", "", "", ""], answer: 0 }]);
  const removeQ = (id) => setQuestions(p => p.filter(q => q.id !== id));
  const setQ = (id, field, val) => setQuestions(p => p.map(q => q.id === id ? { ...q, [field]: val } : q));
  const setOpt = (qid, oi, val) => setQuestions(p => p.map(q => q.id === qid ? { ...q, options: q.options.map((o, i) => i === oi ? val : o) } : q));
  const valid = title && questions.every(q => q.question && q.options.every(o => o));

  return (
    <div style={s.modalOverlay}>
      <div style={{ ...s.modal, maxWidth: 560, maxHeight: "85vh", overflowY: "auto" }}>
        <div style={s.modalTitle}>+ Add Quiz</div>
        <div>
          <label style={s.label}>Quiz Title *</label>
          <input style={s.input} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Midterm Quiz" />
        </div>

        {questions.map((q, qi) => (
          <div key={q.id} style={{ background: "#12121f", borderRadius: 10, padding: 16, marginTop: 16, border: "1px solid #222" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ color: "#7b61ff", fontWeight: 800, fontSize: 13 }}>Question {qi + 1}</span>
              {questions.length > 1 && (
                <button style={s.deleteBtn} onClick={() => removeQ(q.id)}>✕ Remove</button>
              )}
            </div>
            <input style={{ ...s.input, marginBottom: 10 }} value={q.question} onChange={e => setQ(q.id, "question", e.target.value)} placeholder="Enter question text..." />
            {q.options.map((opt, oi) => (
              <div key={oi} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <input type="radio" name={`ans-${q.id}`} checked={q.answer === oi} onChange={() => setQ(q.id, "answer", oi)} style={{ accentColor: "#00c2a8", cursor: "pointer", width: 16, height: 16 }} />
                <input style={{ ...s.input, flex: 1 }} value={opt} onChange={e => setOpt(q.id, oi, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + oi)}`} />
              </div>
            ))}
            <div style={{ color: "#555", fontSize: 12, marginTop: 6 }}>● Select the radio button next to the correct answer</div>
          </div>
        ))}

        <button
          style={{ ...s.btn, background: "#1e1e3a", border: "1px dashed #7b61ff", color: "#7b61ff", width: "100%", marginTop: 16 }}
          onClick={addQ}
        >
          + Add Another Question
        </button>

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button style={{ ...s.btn, ...s.btnPrimary, flex: 1, opacity: valid ? 1 : 0.5 }} disabled={!valid} onClick={() => onAdd({ title, questions })}>
            Save Quiz
          </button>
          <button style={{ ...s.btn, background: "#222", flex: 1 }} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
export function DeleteConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div style={s.modalOverlay}>
      <div style={{ ...s.modal, maxWidth: 380 }}>
        <div style={s.modalTitle}>⚠ Confirm Delete</div>
        <p style={{ color: "#aaa", marginBottom: 24 }}>{message || "This action cannot be undone."}</p>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ ...s.btn, ...s.btnDanger, flex: 1 }} onClick={onConfirm}>Delete</button>
          <button style={{ ...s.btn, background: "#222", flex: 1 }} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
