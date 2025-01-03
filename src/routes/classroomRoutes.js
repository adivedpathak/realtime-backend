const express = require("express");
const router = express.Router();
const { createClassroom, addStudentToClassroom, removeStudentFromClassroom } = require("../controllers/classroomController");

router.post("/create", createClassroom);
router.post("/addStudent", addStudentToClassroom);
router.post("/removeStudent", removeStudentFromClassroom);

module.exports = router;

