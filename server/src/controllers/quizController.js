const express = require('express');
const Quiz = require('../models/quizModel');

const handleStartQuiz = async (req, res) => {
  try {
    // User preferences from the request (e.g., category, class, difficulty, number of questions)
    const { userId, categoryId, classId, difficulty, numQuestions } = req.body;

    const questions = await Quiz.find({
      categoryId,
      classId,
      difficulty,
    })
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

// Submit a user's answer for a question
const handleSubmitQuiz = async (req, res) => {
  try {
    // Retrieve the user's answer and session ID from the request
    const { sessionId, questionId, userAnswer } = req.body;

    // Retrieve the quiz session
    const quizSession = await Quiz.findById(sessionId).exec();

    // Find the question by ID
    const question = quizSession.questions.find((q) => q._id == questionId);

    // Validate the user's answer and calculate the score
    const isCorrect = question.correctAnswer === userAnswer;
    const score = isCorrect ? 1 : 0;

    // Update the session with the user's answer and score
    const answer = { questionId, userAnswer, isCorrect };
    //quizSession.userAnswers.push(answer);
    quizSession.score += score;

    // Save the updated session
    await quizSession.save();

    res.json({ message: 'Answer submitted', isCorrect, score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// End a quiz session and save it to history
const handleEndQuiz = async (req, res) => {
  try {
    // Retrieve the session ID from the request
    const { sessionId } = req.body;

    // Retrieve the quiz session
    const quizSession = await Quiz.findById(sessionId).exec();

    // Save the session details to the user's quiz history
    const user = await User.findById(quizSession.user).exec();
    const historyItem = new History({
      category: quizSession.categoryId,
      class: quizSession.classId,
      difficulty: quizSession.difficulty,
      score: quizSession.score,
      userAnswers: quizSession.userAnswers,
    });
    user.quizHistory.push(historyItem);
    await user.save();

    await quizSession.remove();

    res.json({ message: 'Quiz session ended', historyItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  handleStartQuiz,
  handleEndQuiz,
  handleSubmitQuiz
};