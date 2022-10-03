const asyncHandler = require("express-async-handler");
const Practise = require("../models/practiseModel");
const User = require("../models/userModel");

const getPractiseData = asyncHandler(async (req, res) => {
    const practise = await Practise.find({ user: req.user._id });
    res.status(200).json(practise);
});


const setPractiseData = asyncHandler(async (req, res) => {
    // get current date
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate() + 1;
    var year = dateObj.getUTCFullYear();
    newdate = year + "/" + month + "/" + day;

    // check if duration is present
    if (!req.body.duration) {
        res.status(400);
        throw new Error("Duration is required");
    }
    const { duration } = req.body;

    // check if entry exist for current date
    const practise = await Practise.findOne({
        Date: newdate,
        user: req.user._id,
    });
    let result;
    if (practise) {
        // if entry exist, update duration
        result = await Practise.findOneAndUpdate(
            { Date: newdate, user: req.user._id },
            { duration: parseInt(practise.duration) + parseInt(duration) },
            { new: true }
        );
    } else {
        result = await Practise.create({
            duration,
            user: req.user._id,
        });
    }

    res.status(200).json(result);
});



const deletePractiseData = asyncHandler(async (req, res) => {
    // deletes practise data of past 7 days

    // get 7 days before date



    var dateObj = new Date();

    dateObj.setDate(dateObj.getDate() - 7);

    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate() + 1;
    var year = dateObj.getUTCFullYear();
    newdate = year + "/" + month + "/" + day;

    try {
        console.log(newdate);
        const practise = await Practise.deleteMany({
            Date: { $lt: newdate },
            user: req.user._id,
        });
        console.log(practise);
        res.status(200).json(practise);

        
    } catch (error) {
        console.log(error);
    res.status(400).json(error);

    }

});


module.exports = {
    getPractiseData,
    setPractiseData,
    deletePractiseData,
};
