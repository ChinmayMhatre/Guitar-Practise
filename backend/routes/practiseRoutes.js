const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    getPractiseData,
    setPractiseData,
    deletePractiseData,
} = require("../controllers/practiseController");

router.get("/", protect, getPractiseData);
router.post("/", protect, setPractiseData);
router.delete("/", protect, deletePractiseData);

module.exports = router;
