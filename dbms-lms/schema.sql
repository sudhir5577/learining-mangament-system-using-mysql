-- ============================================================
--  QueryLearn – DBMS LMS  |  MySQL 8+ Schema
--  Run this file once to set up the database:
--    mysql -u root -p < schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS querylearn;
USE querylearn;

-- ── Users ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          VARCHAR(10)  PRIMARY KEY,
  role        ENUM('teacher','student') NOT NULL,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  avatar      VARCHAR(10)  NOT NULL,
  color       VARCHAR(10)  NOT NULL,
  created_at  DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- ── Courses ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id          INT          PRIMARY KEY AUTO_INCREMENT,
  title       VARCHAR(200) NOT NULL,
  instructor  VARCHAR(150) NOT NULL,
  description TEXT,
  duration    VARCHAR(50),
  level       ENUM('Beginner','Intermediate','Advanced') NOT NULL DEFAULT 'Beginner',
  enrolled    INT          NOT NULL DEFAULT 0,
  color       VARCHAR(10)  NOT NULL DEFAULT '#00c2a8',
  created_at  DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- ── Modules ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS modules (
  id          INT          PRIMARY KEY AUTO_INCREMENT,
  course_id   INT          NOT NULL,
  title       VARCHAR(200) NOT NULL,
  type        ENUM('lecture','quiz','lab','assignment','video') NOT NULL DEFAULT 'lecture',
  done        TINYINT(1)   NOT NULL DEFAULT 0,
  created_at  DATETIME     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- ── Quizzes ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quizzes (
  id          INT          PRIMARY KEY AUTO_INCREMENT,
  course_id   INT          NOT NULL,
  title       VARCHAR(200) NOT NULL,
  created_at  DATETIME     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- ── Quiz Questions ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_questions (
  id          INT          PRIMARY KEY AUTO_INCREMENT,
  quiz_id     INT          NOT NULL,
  question    TEXT         NOT NULL,
  options     JSON         NOT NULL,
  answer      INT          NOT NULL,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- ── Enrollment log (for trigger) ─────────────────────────────
CREATE TABLE IF NOT EXISTS enrollment_log (
  id          INT          PRIMARY KEY AUTO_INCREMENT,
  course_id   INT          NOT NULL,
  old_count   INT,
  new_count   INT,
  changed_at  DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
--  TRIGGER: Log every change to courses.enrolled
-- ============================================================
DROP TRIGGER IF EXISTS trg_enrollment_log;

DELIMITER $$
CREATE TRIGGER trg_enrollment_log
AFTER UPDATE ON courses
FOR EACH ROW
BEGIN
  IF OLD.enrolled <> NEW.enrolled THEN
    INSERT INTO enrollment_log (course_id, old_count, new_count)
    VALUES (NEW.id, OLD.enrolled, NEW.enrolled);
  END IF;
END$$
DELIMITER ;

-- ============================================================
--  Seed Data
-- ============================================================

-- Users
INSERT IGNORE INTO users (id, role, name, email, password, avatar, color) VALUES
  ('t1','teacher','Dr. Ananya Sharma', 'ananya@dbms.edu', 'teacher123', 'AS', '#00c2a8'),
  ('t2','teacher','Prof. Rajiv Mehta',  'rajiv@dbms.edu',  'teacher123', 'RM', '#f7a800'),
  ('t3','teacher','Dr. Priya Nair',     'priya@dbms.edu',  'teacher123', 'PN', '#e84545'),
  ('s1','student','Sudhir Kumar',       'sudhir@student.edu', 'student123', 'SK', '#7b61ff'),
  ('s2','student','Meera Reddy',        'meera@student.edu',  'student123', 'MR', '#00a9e0'),
  ('s3','student','Arjun Singh',        'arjun@student.edu',  'student123', 'AS', '#ff6b6b');

-- Courses
INSERT IGNORE INTO courses (id, title, instructor, description, duration, level, enrolled, color) VALUES
  (1,'Introduction to DBMS',       'Dr. Ananya Sharma', 'Covers fundamental concepts of database systems, data models, and architecture.','6 weeks','Beginner',    142,'#00c2a8'),
  (2,'SQL & Relational Algebra',   'Prof. Rajiv Mehta', 'Deep dive into SQL queries, joins, subqueries, and relational algebra operations.','8 weeks','Intermediate', 98,'#f7a800'),
  (3,'Normalization & Schema Design','Dr. Priya Nair', 'Learn 1NF through BCNF, functional dependencies, and ER diagram design.',         '5 weeks','Intermediate', 76,'#e84545'),
  (4,'Transactions & Concurrency', 'Prof. Kiran Bose', 'ACID properties, transaction management, locking protocols and concurrency control.','4 weeks','Advanced',     54,'#7b61ff');

-- Modules
INSERT IGNORE INTO modules (id, course_id, title, type, done) VALUES
  (1, 1,'What is a DBMS?',        'lecture',0),
  (2, 1,'Data Models Overview',   'lecture',0),
  (3, 1,'Quiz: DBMS Basics',      'quiz',   0),
  (4, 2,'SELECT Statements',      'lecture',0),
  (5, 2,'JOINs in Depth',         'lecture',0),
  (6, 2,'Subqueries & CTEs',      'lecture',0),
  (7, 2,'Quiz: SQL Fundamentals', 'quiz',   0),
  (8, 3,'Functional Dependencies','lecture',0),
  (9, 3,'1NF, 2NF, 3NF',         'lecture',0),
  (10,3,'BCNF & Higher Forms',    'lecture',0),
  (11,3,'ER Diagram Lab',         'lab',    0),
  (12,4,'ACID Properties',        'lecture',0),
  (13,4,'Locks & Deadlocks',      'lecture',0),
  (14,4,'Isolation Levels',       'lecture',0);

-- Quizzes
INSERT IGNORE INTO quizzes (id, course_id, title) VALUES
  (1, 1,'DBMS Basics Quiz'),
  (2, 2,'SQL Fundamentals Quiz'),
  (3, 4,'Transactions Quiz');

-- Quiz questions
INSERT IGNORE INTO quiz_questions (id, quiz_id, question, options, answer) VALUES
  (1,1,'What does DBMS stand for?',
   '["Data Base Management System","Data Binary Management System","Dynamic Base Management System","None of the above"]', 0),
  (2,1,'Which is NOT a type of database model?',
   '["Relational","Hierarchical","Sequential","Network"]', 2),
  (3,1,'Which component stores the actual data?',
   '["Query Processor","Transaction Manager","Storage Manager","Schema Manager"]', 2),

  (4,2,'Which SQL clause filters rows?',
   '["HAVING","WHERE","GROUP BY","ORDER BY"]', 1),
  (5,2,'INNER JOIN returns...?',
   '["All rows from left table","Only matching rows from both tables","All rows from right table","All rows from both tables"]', 1),
  (6,2,'Which keyword removes duplicate rows?',
   '["UNIQUE","DISTINCT","FILTER","REMOVE"]', 1),

  (7,3,'What does ACID stand for?',
   '["Atomicity, Consistency, Isolation, Durability","Atomicity, Concurrency, Integrity, Durability","Access, Consistency, Isolation, Dependency","Atomicity, Consistency, Integration, Data"]', 0),
  (8,3,'Which isolation level prevents dirty reads?',
   '["Read Uncommitted","Read Committed","Repeatable Read","Serializable"]', 1);
