const express = require('express');
const router  = express.Router();

const { create, fetchTasks, update, removeTask} = require('../controllers/taskController');

router.post('/create', create);
router.get('/viewtasks', fetchTasks);
router.put('/updatetask/:id', update);
router.delete('/deletetask/:id', removeTask);

module.exports = router;
