const Database = require('better-sqlite3');
const path = require('path');

// Create database connection
const dbPath = path.resolve(__dirname, 'tasks.db');
const db = new Database(dbPath);

// Initialize tasks table
db.exec(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  status TEXT DEFAULT 'Pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

module.exports = db;