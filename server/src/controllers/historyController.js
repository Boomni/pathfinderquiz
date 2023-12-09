const History = require('../models/historyModel');

const addHistoryItem = async (userId, categoryId, classId, difficulty, score, userAnswers) => {
  try {
    const historyItem = new History({
      user: userId,
      category: categoryId,
      class: classId,
      difficulty: difficulty,
      score: score,
      userAnswers: userAnswers,
    });

    await historyItem.save();
    return historyItem;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  addHistoryItem
};