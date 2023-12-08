const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: {
        type: String,
        required: [true, "Class name Required"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "Class description Required"]
    },
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;