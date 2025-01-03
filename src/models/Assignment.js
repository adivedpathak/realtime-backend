const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileUrl: { type: String },
  answers: [{ questionId: mongoose.Schema.Types.ObjectId, answer: String }],
  feedback: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: true },
    dueDate: { type: Date, required: true },
    type: { type: String, enum: ["quiz", "problem_statement"], required: true },
    topic: { type: String },
    questions: [{ questionText: String, options: [String], correctAnswer: String }],
    submissions: [submissionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
