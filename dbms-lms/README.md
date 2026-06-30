# QueryLearn – DBMS Learning Management System

A full-stack LMS backed by **MySQL 8+** and an **Express.js REST API**.

---

## 🗄 Database Features

- **6 tables**: `users`, `courses`, `modules`, `quizzes`, `quiz_questions`, `enrollment_log`
- **SQL Trigger** (`trg_enrollment_log`): automatically logs every change to `courses.enrolled`
- **Foreign keys** with `ON DELETE CASCADE` for clean relational integrity
- Full CRUD through REST API — data **persists across refreshes**

---

## ▶ How to Run

### Prerequisites
- **Node.js** v14+ → https://nodejs.org/
- **MySQL 8+** → https://dev.mysql.com/downloads/

---

### Step 1 – Set up the database

Open MySQL and run the schema file:

```bash
mysql -u root -p < schema.sql
```

This creates the `querylearn` database, all tables, the trigger, and seeds demo data.

---

### Step 2 – Configure & start the backend

```bash
# Install backend dependencies
npm install --prefix . --package-lock-only   # or: npm install (in root, using package-server.json)
npm install express mysql2 cors
```

Edit `server.js` line ~15 if needed:
```js
password: "",   // ← put your MySQL root password here
```

Then start the server:
```bash
node server.js
```

You should see:
```
✅  QueryLearn API running at http://localhost:4000
    React frontend: http://localhost:3000
```

---

### Step 3 – Start the React frontend

Open a **second terminal** in the same folder:

```bash
npm install
npm start
```

The app opens at **http://localhost:3000**.

---

## 📁 Project Structure

```
dbms-lms/
├── schema.sql              ← MySQL schema + trigger + seed data
├── server.js               ← Express REST API (port 4000)
├── package.json            ← React dependencies
├── package-server.json     ← Backend dependencies reference
├── public/
│   └── index.html
└── src/
    ├── App.js              ← Root component (fetches from API)
    ├── auth.js             ← (kept for reference, login now via API)
    ├── data.js             ← Seed data reference (no longer used at runtime)
    ├── styles.js
    ├── components/
    │   ├── CourseCard.js
    │   └── Modals.js
    └── pages/
        ├── Dashboard.js
        ├── CourseList.js
        ├── CourseDetail.js
        ├── QuizView.js
        ├── StudentDashboard.js
        ├── StudentCourseList.js
        ├── StudentCourseDetail.js
        └── LoginPage.js
```

---

## 🔑 Demo Credentials

| Role    | Email                   | Password     |
|---------|-------------------------|--------------|
| Teacher | ananya@dbms.edu         | teacher123   |
| Teacher | rajiv@dbms.edu          | teacher123   |
| Teacher | priya@dbms.edu          | teacher123   |
| Student | sudhir@student.edu      | student123   |
| Student | meera@student.edu       | student123   |
| Student | arjun@student.edu       | student123   |

---

## 🔌 API Endpoints

| Method | Endpoint                          | Description           |
|--------|-----------------------------------|-----------------------|
| POST   | /api/login                        | Authenticate user     |
| GET    | /api/courses                      | List all courses      |
| POST   | /api/courses                      | Create course         |
| DELETE | /api/courses/:id                  | Delete course         |
| POST   | /api/courses/:id/modules          | Add module            |
| DELETE | /api/modules/:id                  | Delete module         |
| PATCH  | /api/modules/:id/toggle           | Toggle module done    |
| POST   | /api/courses/:id/quizzes          | Add quiz              |
| DELETE | /api/quizzes/:id                  | Delete quiz           |
