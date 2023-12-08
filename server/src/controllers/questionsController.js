const Question = require('../models/questionModel');
const Class = require('../models/classModel');
const Category = require('../models/categoryModel');

const addQuestion = async (req, res) => {
    try {
        const { question, answer, options, difficulty, image } = req.body;
        const classId = req.params.classId;
        const categoryId = req.params.categoryId;

        const theClass = await Class.findById(classId);
        const theCategory = await Category.findById(categoryId);

        if (!theClass || !theCategory) {
            return res.status(404).json({ error: 'Class or Category not found' });
        }

        if (!question || !answer || !options || !difficulty) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!Array.isArray(options)) {
            return res.status(400).json({ error: 'Options must be an array' });
        }

        const allowedDifficulties = ['easy', 'medium', 'hard'];
        if (!allowedDifficulties.includes(difficulty)) {
            return res.status(400).json({ error: 'Invalid difficulty level' });
        }

        const newQuestion = new Question({
            question,
            answer,
            image,
            options,
            difficulty,
            classId,
            categoryId,
        });

        await newQuestion.save();

        res.status(201).json({
            message: `Question created successfully and added to ${theCategory.name} category in ${theClass.name} class`,
            newQuestion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Question creation failed' });
    }
}

const getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const theQuestion = await Question.findById(questionId);

    if (!theQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.status(200).json({ message: 'Question details retrieved successfully', theQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const updateQuestion = async (req, res) => {
    try {
      const questionId = req.params.questionId;
      const { question, answer, options, difficulty, image } = req.body;
  
      const theQuestion = await Question.findById(questionId);
  
      if (!theQuestion) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      if (question) {
        theQuestion.question = question;
      }
      if (answer) {
        theQuestion.answer = answer;
      }
      if (options) {
        theQuestion.options = options;
      }
      if (difficulty) {
        theQuestion.difficulty = difficulty;
      }
      if (image) {
        theQuestion.image = image;
      }
  
      await theQuestion.save();
  
      res.status(200).json({
        message: 'Question updated successfully',
        updatedQuestion: theQuestion,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Question update failed' });
    }
  };

  const deleteQuestion = async (req, res) => {
    const questionId = req.params.questionId;
  
    try {
      const deletedQuestion = await Question.findByIdAndRemove(questionId);
  
      if (!deletedQuestion) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      res.status(204).json({ message: 'Question deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {
    addQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion
}