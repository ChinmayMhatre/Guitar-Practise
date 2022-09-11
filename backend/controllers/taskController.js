const asyncHandler = require("express-async-handler");
// @desc gets all tasks
// @route GET /api/tasks
// @access Private
const getTasks = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "get tasks" });
});

// @desc create a task
// @route POST /api/tasks
// @access Private
const setTask = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "set task" });
});

// @desc update a task
// @route PUT /api/tasks/:id
// @access Private
const updateTask = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `update task ${req.params.id}` });
});

// @desc delete a task
// @route DELETE /api/tasks/:id
// @access Private
const deleteTask = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `delete task ${req.params.id}` });
});

module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask,
};
