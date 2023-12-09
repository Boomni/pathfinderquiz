const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

/**
 * @swagger
 * tags:
 *   name: History
 *   description: API endpoints for quiz history
 */

/**
 * @swagger
 * /history/add:
 *   post:
 *     summary: Add a quiz session to user history
 *     description: Add details of a quiz session to the user's quiz history.
 *     tags: [History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user.
 *               categoryId:
 *                 type: string
 *                 description: The category of the quiz.
 *               classId:
 *                 type: string
 *                 description: The class of the quiz.
 *               difficulty:
 *                 type: string
 *                 description: The difficulty level of the quiz.
 *               score:
 *                 type: number
 *                 description: The score earned in the quiz.
 *               userAnswers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                       description: The ID of the question.
 *                     userAnswer:
 *                       type: string
 *                       description: The user's answer to the question.
 *                     isCorrect:
 *                       type: boolean
 *                       description: Indicates whether the answer is correct.
 *     responses:
 *       200:
 *         description: Quiz session added to history successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */
router.post('/add', async (req, res) => {
  try {
    const { userId, categoryId, classId, difficulty, score, userAnswers } = req.body;
    await historyController.addHistoryItem(userId, categoryId, classId, difficulty, score, userAnswers);
    res.json({ message: 'Quiz session added to history successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
