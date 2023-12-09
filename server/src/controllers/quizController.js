const express = require('express');
const Quiz = require('../models/quizModel');
const User = require('../models/userModel');
const HistoryController = require('../controllers/historyController');

const findQuestionById = (questions, questionId) => {
  return questions.find((q) => q._id == questionId);
};

const handleStartQuiz = async (req, res) => {
  try {
    const { userId, categoryId, classId, difficulty, numQuestions } = req.body;

    const questions = await Quiz.find({ categoryId, classId, difficulty })
      .limit(numQuestions)
      .exec();

    const quizSession = new Quiz({
      user: userId,
      categoryId,
      classId,
      difficulty,
      questions,
      startTime: new Date(),
    });

    const savedSession = await quizSession.save();

    res.json({ message: 'Quiz session started', quizSession: savedSession });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const handleSubmitQuiz = async (req, res) => {
  try {
    const { sessionId, questionId, userAnswer } = req.body;

    const quizSession = await Quiz.findById(sessionId).exec();
    const question = findQuestionById(quizSession.questions, questionId);

    const isCorrect = question.correctAnswer === userAnswer;
    const score = isCorrect ? 1 : 0;

    const answer = { questionId, userAnswer, isCorrect };
    quizSession.score += score;

    await quizSession.save();

    res.json({ message: 'Answer submitted', isCorrect, score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const handleEndQuiz = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const quizSession = await Quiz.findById(sessionId).exec();
    const user = await User.findById(quizSession.user).exec();

    const { category, classId, difficulty, score, userAnswers } = quizSession;

    await HistoryController.addHistoryItem(user._id, category, classId, difficulty, score, userAnswers);

    await quizSession.remove();

    res.json({ message: 'Quiz session ended successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  handleStartQuiz,
  handleEndQuiz,
  handleSubmitQuiz,
};
