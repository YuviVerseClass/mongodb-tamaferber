const Task = require('../models/Task');

async function getTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get tasks' });
  }
}

async function addTask(req, res) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const newTask = await Task.create({ title });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add task' });
  }
}


async function toggleTask(req, res) {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.done = !task.done;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle task' });
  }
}


async function deleteTask(req, res) {
  const { id } = req.params;

  try {
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}


module.exports = {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
};
