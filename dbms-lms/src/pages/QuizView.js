import React from "react";
import { s } from "../styles";

export default function QuizView({ quiz, quizState, setQuizState, onBack }) {
  const { answers, submitted, score } = quizState;

  const select = (qid, idx) => {
    if (submitted) return;
    setQuizState(p => ({ ...p, answers: { ...p.answers, [qid]: idx } }));
  };

  const submit = () => {
    let correct = 0;
    quiz.questions.forEach(q => { if (answers[q.id] === q.answer) correct++; });
    setQuizState(p => ({ ...p, submitted: true, score: correct }));
  };

  const reset = () => setQuizState({ answers: {}, submitted: false, score: 0 });

  const pct = quiz.questions.length ? Math.round((score / quiz.questions.length) * 100) : 0;
  const answered = Object.keys(answers).length;

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={onBack}>← Back to Course</button>

      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>{quiz.title}</h1>
          <p style={s.pageSubtitle}>{quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""}</p>
        </div>
        {submitted && (
          <button style={{ ...s.btn, background: "#1e1e3a", border: "1px solid #7b61ff", color: "#7b61ff" }} onClick={reset}>
            ↺ Retry
          </button>
        )}
      </div>

      {/* Score card */}
      {submitted && (
        <div style={{ ...s.scoreCard, borderColor: pct >= 60 ? "#00c2a8" : "#e84545", marginBottom: 28 }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: pct >= 60 ? "#00c2a8" : "#e84545", letterSpacing: "-2px" }}>
            {pct}%
          </div>
          <div style={{ color: "#aaa", marginTop: 6, fontSize: 15 }}>{score} / {quiz.questions.length} correct</div>
          <div style={{ marginTop: 10, fontWeight: 700, fontSize: 16, color: pct >= 80 ? "#00c2a8" : pct >= 60 ? "#f7a800" : "#e84545" }}>
            {pct >= 80 ? "🏆 Excellent!" : pct >= 60 ? "✅ Passed!" : "❌ Keep practising!"}
          </div>
        </div>
      )}

      {/* Questions */}
      {quiz.questions.map((q, qi) => (
        <div key={q.id} style={s.questionCard}>
          <div style={s.questionTitle}>
            <span style={{ color: "#7b61ff", marginRight: 8 }}>Q{qi + 1}.</span>{q.question}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            {q.options.map((opt, oi) => {
              let bg = "#1a1a2e";
              let border = "1px solid #2a2a3e";
              let color = "#ccc";

              if (submitted) {
                if (oi === q.answer) { bg = "#00c2a814"; border = "1px solid #00c2a8"; color = "#00c2a8"; }
                else if (answers[q.id] === oi && oi !== q.answer) { bg = "#e8454514"; border = "1px solid #e84545"; color = "#e84545"; }
              } else if (answers[q.id] === oi) {
                bg = "#7b61ff14"; border = "1px solid #7b61ff"; color = "#c4b5ff";
              }

              return (
                <button
                  key={oi}
                  style={{ ...s.optionBtn, background: bg, border, color, cursor: submitted ? "default" : "pointer" }}
                  onClick={() => select(q.id, oi)}
                >
                  <span style={{
                    ...s.optionLetter,
                    background: submitted && oi === q.answer ? "#00c2a8" : submitted && answers[q.id] === oi ? "#e84545" : answers[q.id] === oi ? "#7b61ff" : "#1e1e3a",
                    color: submitted && (oi === q.answer || answers[q.id] === oi) ? "#fff" : "#aaa",
                  }}>
                    {String.fromCharCode(65 + oi)}
                  </span>
                  {opt}
                  {submitted && oi === q.answer && <span style={{ marginLeft: "auto", color: "#00c2a8" }}>✓</span>}
                  {submitted && answers[q.id] === oi && oi !== q.answer && <span style={{ marginLeft: "auto", color: "#e84545" }}>✗</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted && (
        <button
          style={{ ...s.btn, ...s.btnPrimary, width: "100%", padding: "16px", fontSize: 15, marginTop: 8, opacity: answered < quiz.questions.length ? 0.5 : 1 }}
          disabled={answered < quiz.questions.length}
          onClick={submit}
        >
          Submit Quiz &nbsp;({answered}/{quiz.questions.length} answered)
        </button>
      )}
    </div>
  );
}
