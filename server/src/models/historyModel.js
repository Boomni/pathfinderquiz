const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  userAnswers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz', // Reference to the Quiz model
      },
      userAnswer: String,
      isCorrect: Boolean,
    },
  ],
});

const History = mongoose.model('History', historySchema);

module.exports = History;
