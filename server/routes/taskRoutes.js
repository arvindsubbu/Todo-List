const router = require("express").Router();
const {
  addTask,
  deleteTask,
  updateTask,
  getAllTasks,
} = require("../controller/taskcontroller.js");

 router.post("/add-task", addTask);
router.delete("/delete-task/:taskId", deleteTask);  
router.patch("/update-task", updateTask);
router.get("/get-all-tasks/", getAllTasks);
 module.exports = router;
// This code defines the routes for task management in a to-do list application.