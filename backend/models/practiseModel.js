const mongoose = require('mongoose');

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate() + 1;
var year = dateObj.getUTCFullYear();

newdate = year + "/" + month + "/" + day;


const practiseSchema = mongoose.Schema({
    Date: {
        type: Date,
        required: [true, 'Date is required'],
        default: newdate,
    },
    duration: {
        type: Number,
        required: [true, 'Please add a duration'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model('Practise', practiseSchema);
