const Assignment = require("../models/Assignment");

// Submit assignment by a student
exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId, studentId, answers, fileUrl } = req.body;
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    const submission = {
      student: studentId,
      answers,
      fileUrl,
      feedback: "Feedback from AI will be provided soon",
    };

    assignment.submissions.push(submission);
    await assignment.save();

    res.status(200).json({ message: "Assignment submitted successfully", submission });
  } catch (error) {
    res.status(500).json({ message: "Error submitting assignment", error: error.message });
  }
};

// Get feedback for the submitted assignment
exports.getFeedback = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const assignment = await Assignment.findOne({ "submissions._id": submissionId });
    if (!assignment) return res.status(404).json({ message: "Submission not found" });

    const submission = assignment.submissions.id(submissionId);
    res.status(200).json({ feedback: submission.feedback });
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error: error.message });
  }
};
