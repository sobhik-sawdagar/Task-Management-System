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

      db.run(query, [title, description, dueDate], function(err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: this.lastID, ...task });
      });
    });
  }

  // Get all tasks
  static getAllTasks() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM tasks ORDER BY created_at DESC';
      
      db.all(query, [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
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

      db.run(query, [title, description, dueDate, status, id], function(err) {
        if (err) {
          return reject(err);
        }
        if (this.changes === 0) {
          return reject(new Error('Task not found'));
        }
        resolve({ id, ...updateData });
      });
    });
  }

  // Delete a task
  static deleteTask(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM tasks WHERE id = ?';
      
      db.run(query, [id], function(err) {
        if (err) {
          return reject(err);
        }
        if (this.changes === 0) {
          return reject(new Error('Task not found'));
        }
        resolve({ message: 'Task deleted successfully' });
      });
    });
  }
}

module.exports = TaskSchema;