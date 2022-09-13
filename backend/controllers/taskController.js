const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Task = require("../models/taskModel");

// @desc gets all tasks
// @route GET /api/tasks
// @access Private
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({user: req.user._id});
    res.status(200).json(tasks);
});

// @desc create a task
// @route POST /api/tasks
// @access Private
const setTask = asyncHandler(async (req, res) => {
    if (!req.body.title) {
        res.status(400);
        throw new Error("Title is required");
    }
    if (!req.body.duration) {
        res.status(400);
        throw new Error("Duration is required");
    }
    if (!req.body.difficulty) {
        res.status(400);
        throw new Error("Difficulty is required");
    }
    const {title, duration, difficulty} = req.body;
    const task = await Task.create({
        title,
        duration,
        difficulty,
        user: req.user._id
    });

    res.status(200).json(task);
});

// @desc update a task
// @route PUT /api/tasks/:id
// @access Private
const updateTask = asyncHandler(async (req, res) => {

    const task = await Task.findById(req.params.id);
    console.log(req.body);
    if(!task){
        res.status(404);
        throw new Error("Task not found");
    }
    if (!req.body.title) {
        res.status(400);
        throw new Error("Title is required");
    }
    if (!req.body.duration) {
        res.status(400);
        throw new Error("Duration is required");
    }
    if (!req.body.difficulty) {
        res.status(400);
        throw new Error("Difficulty is required");
    }

    const user = await User.findById(req.user._id);
    
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    if(user._id.toString() !== task.user.toString()){
        res.status(401);
        throw new Error("Not authorized");
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,});

    res.status(200).json(updatedTask);
});

// @desc delete a task
// @route DELETE /api/tasks/:id
// @access Private
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(404);
        throw new Error("Task not found");
    }

    const user = await User.findById(req.user._id);
    
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    if(user._id.toString() !== task.user.toString()){
        res.status(401);
        throw new Error("Not authorized");
    }

    await task.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = {

    getTasks,
    setTask,
    updateTask,
    deleteTask,
};
