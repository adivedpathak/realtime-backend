const express = require("express");
const router = express.Router();
const { uploadAssignment, getClassroomAssignments } = require("../controllers/assignmentController");
const { submitAssignment, getFeedback } = require("../controllers/submissionController");

router.post("/upload", uploadAssignment);
router.get("/:classroomId", getClassroomAssignments);
router.post("/:assignmentId/submit", submitAssignment);
router.get("/:submissionId/feedback", getFeedback);

module.exports = router;
