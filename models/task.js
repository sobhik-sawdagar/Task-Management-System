const db = require('../config/database');

class TaskSchema {
  // Create a new task
  static createTask(task) {
    return new Promise((resolve, reject) => {
      const { title, description, dueDate } = task;

      // Validate title
      if (!title || title.trim() === '') {
        return reject(new Error('Task title cannot be empty'));
      }

      const query = `
        INSERT INTO tasks (title, description, due_date) 
        VALUES (?, ?, ?)
      `;

      try {
        const stmt = db.prepare(query);
        const result = stmt.run(title, description, dueDate);
        resolve({ id: result.lastInsertRowid, ...task });
      } catch (err) {
        reject(err);
      }
    });
  }

  // Get all tasks
  static getAllTasks() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM tasks ORDER BY created_at DESC';
      
      try {
        const rows = db.prepare(query).all();
        resolve(rows);
      } catch (err) {
        reject(err);
      }
    });
  }

  // Update a task
  static updateTask(id, updateData) {
    return new Promise((resolve, reject) => {
      const { title, description, dueDate, status } = updateData;

      // Validate title if provided
      if (title && title.trim() === '') {
        return reject(new Error('Task title cannot be empty'));
      }

      const query = `
        UPDATE tasks 
        SET title = COALESCE(?, title), 
            description = COALESCE(?, description), 
            due_date = COALESCE(?, due_date), 
            status = COALESCE(?, status)
        WHERE id = ?
      `;

      try {
        const stmt = db.prepare(query);
        const result = stmt.run(title, description, dueDate, status, id);
        if (result.changes === 0) {
          return reject(new Error('Task not found'));
        }
        resolve({ id, ...updateData });
      } catch (err) {
        reject(err);
      }
    });
  }

  // Delete a task
  static deleteTask(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM tasks WHERE id = ?';
      
      try {
        const stmt = db.prepare(query);
        const result = stmt.run(id);
        if (result.changes === 0) {
          return reject(new Error('Task not found'));
        }
        resolve({ message: 'Task deleted successfully' });
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = TaskSchema;