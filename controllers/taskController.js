const TaskSchema = require('../models/task');

// Create a new task
exports.create = async (req, res) => {
  try {
    const task = await TaskSchema.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tasks
exports.fetchTasks = async (req, res) => {
  try {
    const tasks = await TaskSchema.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task
exports.update = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const updatedTask = await TaskSchema.updateTask(taskId, req.body);
    res.json(updatedTask);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Delete a task
exports.removeTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const result = await TaskSchema.deleteTask(taskId);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};