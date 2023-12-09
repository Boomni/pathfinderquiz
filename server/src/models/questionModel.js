const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: [true, "Question is required"],
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    },
    image: {
        type: String,
        default: null,
    },
    options: {
        type: [String],
        required: [true, "Options are required"],
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: [true, "Question difficulty level required"]
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;