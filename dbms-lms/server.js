// ============================================================
//  QueryLearn – Express + MySQL2 Backend
//  Run: node server.js   (after: npm install in this folder)
// ============================================================

const express = require("express");
const mysql   = require("mysql2/promise");
const cors    = require("cors");

const app  = express();
const PORT = 4000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// ── Database pool ────────────────────────────────────────────
const pool = mysql.createPool({
  host:     "localhost",
  user:     "root",        // change if needed
  password: "",            // change to your MySQL password
  database: "querylearn",
  waitForConnections: true,
  connectionLimit: 10,
});

// ── Helper: build full course objects ───────────────────────
async function fetchCourses(conn, whereClause = "") {
  const [courses] = await conn.query(
    `SELECT * FROM courses ${whereClause} ORDER BY created_at DESC`
  );
  for (const course of courses) {
    // Modules
    const [modules] = await conn.query(
      "SELECT * FROM modules WHERE course_id = ? ORDER BY id",
      [course.id]
    );
    course.modules = modules.map(m => ({ ...m, done: !!m.done }));

    // Quizzes + questions
    const [quizzes] = await conn.query(
      "SELECT * FROM quizzes WHERE course_id = ? ORDER BY id",
      [course.id]
    );
    for (const quiz of quizzes) {
      const [qs] = await conn.query(
        "SELECT * FROM quiz_questions WHERE quiz_id = ? ORDER BY id",
        [quiz.id]
      );
      quiz.questions = qs.map(q => ({
        id:       q.id,
        question: q.question,
        options:  typeof q.options === "string" ? JSON.parse(q.options) : q.options,
        answer:   q.answer,
      }));
    }
    course.quizzes = quizzes;
  }
  return courses;
}

// ============================================================
//  AUTH
// ============================================================

// POST /api/login
app.post("/api/login", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER(?) AND password = ?",
      [email.trim(), password]
    );
    conn.release();
    if (!rows.length) return res.status(401).json({ error: "Invalid email or password." });
    const user = rows[0];
    if (user.role !== role)
      return res.status(403).json({ error: `This account is a ${user.role}, not a ${role}.` });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ============================================================
//  COURSES
// ============================================================

// GET /api/courses
app.get("/api/courses", async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const courses = await fetchCourses(conn);
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch courses" });
  } finally {
    conn.release();
  }
});

// POST /api/courses
app.post("/api/courses", async (req, res) => {
  const { title, instructor, description, duration, level, color } = req.body;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      "INSERT INTO courses (title, instructor, description, duration, level, enrolled, color) VALUES (?,?,?,?,?,0,?)",
      [title, instructor, description, duration, level, color || "#00c2a8"]
    );
    const courses = await fetchCourses(conn, `WHERE id = ${result.insertId}`);
    res.json(courses[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create course" });
  } finally {
    conn.release();
  }
});

// DELETE /api/courses/:id
app.delete("/api/courses/:id", async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.query("DELETE FROM courses WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete course" });
  } finally {
    conn.release();
  }
});

// ============================================================
//  MODULES
// ============================================================

// POST /api/courses/:courseId/modules
app.post("/api/courses/:courseId/modules", async (req, res) => {
  const { title, type } = req.body;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      "INSERT INTO modules (course_id, title, type, done) VALUES (?,?,?,0)",
      [req.params.courseId, title, type]
    );
    const [rows] = await conn.query("SELECT * FROM modules WHERE id = ?", [result.insertId]);
    const mod = { ...rows[0], done: false };
    res.json(mod);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add module" });
  } finally {
    conn.release();
  }
});

// DELETE /api/modules/:id
app.delete("/api/modules/:id", async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.query("DELETE FROM modules WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete module" });
  } finally {
    conn.release();
  }
});

// PATCH /api/modules/:id/toggle
app.patch("/api/modules/:id/toggle", async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.query("UPDATE modules SET done = NOT done WHERE id = ?", [req.params.id]);
    const [rows] = await conn.query("SELECT * FROM modules WHERE id = ?", [req.params.id]);
    res.json({ ...rows[0], done: !!rows[0].done });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to toggle module" });
  } finally {
    conn.release();
  }
});

// ============================================================
//  QUIZZES
// ============================================================

// POST /api/courses/:courseId/quizzes
app.post("/api/courses/:courseId/quizzes", async (req, res) => {
  const { title, questions } = req.body;
  const conn = await pool.getConnection();
  try {
    const [qResult] = await conn.query(
      "INSERT INTO quizzes (course_id, title) VALUES (?,?)",
      [req.params.courseId, title]
    );
    const quizId = qResult.insertId;
    for (const q of questions) {
      await conn.query(
        "INSERT INTO quiz_questions (quiz_id, question, options, answer) VALUES (?,?,?,?)",
        [quizId, q.question, JSON.stringify(q.options), q.answer]
      );
    }
    const [quizRows] = await conn.query("SELECT * FROM quizzes WHERE id = ?", [quizId]);
    const [qRows]    = await conn.query("SELECT * FROM quiz_questions WHERE quiz_id = ? ORDER BY id", [quizId]);
    const quiz = {
      ...quizRows[0],
      questions: qRows.map(q => ({
        id: q.id, question: q.question,
        options: typeof q.options === "string" ? JSON.parse(q.options) : q.options,
        answer: q.answer,
      })),
    };
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add quiz" });
  } finally {
    conn.release();
  }
});

// DELETE /api/quizzes/:id
app.delete("/api/quizzes/:id", async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.query("DELETE FROM quizzes WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete quiz" });
  } finally {
    conn.release();
  }
});

// ============================================================
//  Start server
// ============================================================
app.listen(PORT, () => {
  console.log(`✅  QueryLearn API running at http://localhost:${PORT}`);
  console.log(`    React frontend: http://localhost:3000`);
});
