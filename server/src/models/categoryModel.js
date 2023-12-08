const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Category name Required"],
    },
    description: {
        type: String,
        required: [true, "Category description Required"]
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;