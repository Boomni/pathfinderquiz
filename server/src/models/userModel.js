const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username Required"],
        unique: true
    },
    firstname: {
        type: String,
        required: [true, "firstname Required"]
    },
    lastname: {
        type: String,
        required: [true, "lastname Required"]
    },
    password: {
        type: String,
        required: [true, "Password Required"]
    },
    role: {
        type: String,
        enum: ['pathfinder', 'admin', 'superuser'],
        default: "pathfinder"
    },
    email: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
    },
    refreshToken: String,
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;