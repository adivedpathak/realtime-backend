const Quiz = require('../models/Quiz');
const Assignment = require('../models/Assignment');
const axios = require('axios');  // To fetch quiz from AI Model

// Helper function to fetch quiz from AI Model
const fetchAIQuiz = async (topic, difficulty) => {
  try {
   
    const response = await axios.post('// humara ai model link // anish dega', {
      topic,
      difficulty,
    });
    
    // Sample response structure
    const { questions } = response.data;
    
    // Ensure the structure is correct, e.g., that you have the right fields.
    return questions.map((question) => ({
      questionText: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer,
    }));
  } catch (error) {
    throw new Error('AI model error: Unable to fetch quiz');
  }
};

// Get Randomized Quiz for Student (Based on Topic and Difficulty)
exports.getQuiz = async (req, res) => {
  const { topic, difficulty } = req.query;

  try {
   // ai se quiz loo
    const questions = await fetchAIQuiz(topic, difficulty);

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No quiz questions generated' });
    }

    // us quiz ko save kiya
    const newQuiz = new Quiz({
      topic,
      difficulty,
      questions,
    });

    await newQuiz.save();

    res.status(200).json({ quiz: newQuiz }); 
    // student ko dedo quiz 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz', error: error.message });
  }
};

exports.submitQuiz = async (req, res) => {
  const { quizId, answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let correctAnswers = 0;
    quiz.questions.forEach((q, idx) => {
      if (q.correctAnswer === answers[idx].answer) correctAnswers++;
    });

    // Feedback generation using AI model
    const feedback = await getAIModelFeedback(correctAnswers, quiz.questions.length);

    res.status(200).json({
      correctAnswers,
      feedback,
      totalQuestions: quiz.questions.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz', error: error.message });
  }
};

// Helper function to get feedback from the AI model
const getAIModelFeedback = async (correctAnswers, totalQuestions) => {
  try {


    // Sending result to your AI feedback service for further analysis or feedback

    const response = await axios.post('// humara ai model link // anish dega', {
      correctAnswers,
      totalQuestions,
    });
    
    return response.data.feedback;
  } catch (error) {
    return 'AI feedback unavailable. Please review your answers.';
  }
};
