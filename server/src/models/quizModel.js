const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  categoryId: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;