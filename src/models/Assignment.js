const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileUrl: { type: String },
  answers: [{ questionId: mongoose.Schema.Types.ObjectId, answer: String }],
  feedback: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

const assignmentSchema = new mongoose.Schema({
  classroomId: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignmentType: { type: String, enum: ["quiz", "descriptive"], required: true },
  dueDate: { type: Date, required: true },
  fileUrl: { type: String },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
const Submission = mongoose.model("Submission", submissionSchema);

module.exports = { Assignment, Submission };
