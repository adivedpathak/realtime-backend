const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [String],
  correctAnswer: { type: String, required: true },
});

const quizSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  questions: [questionSchema],
});

module.exports = mongoose.model('Quiz', quizSchema);
