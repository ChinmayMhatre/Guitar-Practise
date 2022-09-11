const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [20, 'Title cannot be more than 20 characters']
    },
    duration: {
        type: Number,
        required: [true, 'Please add a duration'],
        trim: true,
        default: 0},
    difficulty: {
        type: String,
        required: [true, 'Please add a difficulty'],
        trim: true,
        default: 'easy',
        enum: ['easy', 'medium', 'hard'],
    },
    personalbest:{
        type: Number,
        trim: true,
        default: 0
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', taskSchema);
