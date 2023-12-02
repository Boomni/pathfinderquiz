const mongoose = require("mongoose")
require("dotenv").config();

const uri = process.env.MONGODB_URI

const connectDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection success');
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
};

module.exports = connectDatabase;