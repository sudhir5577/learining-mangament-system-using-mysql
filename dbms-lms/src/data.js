export const SEED_COURSES = [
  {
    id: 1,
    title: "Introduction to DBMS",
    instructor: "Dr. Ananya Sharma",
    description: "Covers fundamental concepts of database systems, data models, and architecture.",
    duration: "6 weeks",
    level: "Beginner",
    enrolled: 142,
    color: "#00c2a8",
    modules: [
      { id: 1, title: "What is a DBMS?", type: "lecture", done: false },
      { id: 2, title: "Data Models Overview", type: "lecture", done: false },
      { id: 3, title: "Quiz: DBMS Basics", type: "quiz", done: false },
    ],
    quizzes: [
      {
        id: 1,
        title: "DBMS Basics Quiz",
        questions: [
          { id: 1, question: "What does DBMS stand for?", options: ["Data Base Management System", "Data Binary Management System", "Dynamic Base Management System", "None of the above"], answer: 0 },
          { id: 2, question: "Which is NOT a type of database model?", options: ["Relational", "Hierarchical", "Sequential", "Network"], answer: 2 },
          { id: 3, question: "Which component stores the actual data?", options: ["Query Processor", "Transaction Manager", "Storage Manager", "Schema Manager"], answer: 2 },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "SQL & Relational Algebra",
    instructor: "Prof. Rajiv Mehta",
    description: "Deep dive into SQL queries, joins, subqueries, and relational algebra operations.",
    duration: "8 weeks",
    level: "Intermediate",
    enrolled: 98,
    color: "#f7a800",
    modules: [
      { id: 1, title: "SELECT Statements", type: "lecture", done: false },
      { id: 2, title: "JOINs in Depth", type: "lecture", done: false },
      { id: 3, title: "Subqueries & CTEs", type: "lecture", done: false },
      { id: 4, title: "Quiz: SQL Fundamentals", type: "quiz", done: false },
    ],
    quizzes: [
      {
        id: 1,
        title: "SQL Fundamentals Quiz",
        questions: [
          { id: 1, question: "Which SQL clause filters rows?", options: ["HAVING", "WHERE", "GROUP BY", "ORDER BY"], answer: 1 },
          { id: 2, question: "INNER JOIN returns...?", options: ["All rows from left table", "Only matching rows from both tables", "All rows from right table", "All rows from both tables"], answer: 1 },
          { id: 3, question: "Which keyword removes duplicate rows?", options: ["UNIQUE", "DISTINCT", "FILTER", "REMOVE"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Normalization & Schema Design",
    instructor: "Dr. Priya Nair",
    description: "Learn 1NF through BCNF, functional dependencies, and ER diagram design.",
    duration: "5 weeks",
    level: "Intermediate",
    enrolled: 76,
    color: "#e84545",
    modules: [
      { id: 1, title: "Functional Dependencies", type: "lecture", done: false },
      { id: 2, title: "1NF, 2NF, 3NF", type: "lecture", done: false },
      { id: 3, title: "BCNF & Higher Forms", type: "lecture", done: false },
      { id: 4, title: "ER Diagram Lab", type: "lab", done: false },
    ],
    quizzes: [],
  },
  {
    id: 4,
    title: "Transactions & Concurrency",
    instructor: "Prof. Kiran Bose",
    description: "ACID properties, transaction management, locking protocols and concurrency control.",
    duration: "4 weeks",
    level: "Advanced",
    enrolled: 54,
    color: "#7b61ff",
    modules: [
      { id: 1, title: "ACID Properties", type: "lecture", done: false },
      { id: 2, title: "Locks & Deadlocks", type: "lecture", done: false },
      { id: 3, title: "Isolation Levels", type: "lecture", done: false },
    ],
    quizzes: [
      {
        id: 1,
        title: "Transactions Quiz",
        questions: [
          { id: 1, question: "What does ACID stand for?", options: ["Atomicity, Consistency, Isolation, Durability", "Atomicity, Concurrency, Integrity, Durability", "Access, Consistency, Isolation, Dependency", "Atomicity, Consistency, Integration, Data"], answer: 0 },
          { id: 2, question: "Which isolation level prevents dirty reads?", options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"], answer: 1 },
        ],
      },
    ],
  },
];

export const LEVELS = ["Beginner", "Intermediate", "Advanced"];
export const COLORS = ["#00c2a8", "#f7a800", "#e84545", "#7b61ff", "#00a9e0", "#ff6b6b"];
export const uid = () => Date.now() + Math.floor(Math.random() * 10000);
