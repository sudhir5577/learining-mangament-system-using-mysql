// ── Preset users (no database needed) ───────────────────────────────────────
// Add or edit users here freely

export const USERS = [
  // Teachers
  { id: "t1", role: "teacher", name: "Dr. Ananya Sharma",  email: "ananya@dbms.edu",  password: "teacher123", avatar: "AS", color: "#00c2a8" },
  { id: "t2", role: "teacher", name: "Prof. Rajiv Mehta",  email: "rajiv@dbms.edu",   password: "teacher123", avatar: "RM", color: "#f7a800" },
  { id: "t3", role: "teacher", name: "Dr. Priya Nair",     email: "priya@dbms.edu",   password: "teacher123", avatar: "PN", color: "#e84545" },

  // Students
  { id: "s1", role: "student", name: "Sudhir Kumar",       email: "sudhir@student.edu", password: "student123", avatar: "SK", color: "#7b61ff" },
  { id: "s2", role: "student", name: "Meera Reddy",        email: "meera@student.edu",  password: "student123", avatar: "MR", color: "#00a9e0" },
  { id: "s3", role: "student", name: "Arjun Singh",        email: "arjun@student.edu",  password: "student123", avatar: "AS", color: "#ff6b6b" },
];

export const authenticate = (email, password) => {
  return USERS.find(
    u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
  ) || null;
};
