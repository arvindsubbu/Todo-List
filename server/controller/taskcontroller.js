const Task = require("../model/taskmodel.js");

const addTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.send({
      success: true,
      data: newTask,
      message: "Task added successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.send({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId, task ,status,priority} = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { task,status,priority },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(500).json({ message: "Task not found" });
    }
    res.send({
      success: true,
      message: "Task update successfully",
    });
  } catch (err) {
    return res.send(500).json({ message: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    let tasks  = await Task.find();
    res.send({
      success: true,
      data: tasks,
      message: "Tasks fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports = {
  addTask,
  deleteTask,
  updateTask,
  getAllTasks,
};
