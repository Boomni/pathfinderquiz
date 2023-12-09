const router = require("express").Router();
const quizController = require('../controllers/quizController');

/**
 * @swagger
 * tags:
 *   name: Quiz
 *   description: API endpoints for quiz sessions
 */

/**
 * @swagger
 * /quiz/start:
 *   post:
 *     summary: Start a new quiz session
 *     description: Start a new quiz session based on user preferences.
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user starting the quiz session.
 *               categoryId:
 *                 type: string
 *                 description: The category of the quiz.
 *               classId:
 *                 type: string
 *                 description: The class of the quiz.
 *               difficulty:
 *                 type: string
 *                 description: The difficulty level of the quiz.
 *               numQuestions:
 *                 type: number
 *                 description: The number of questions in the quiz.
 *     responses:
 *       200:
 *         description: Quiz session started successfully
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Quiz session started successfully
 *                quizSession:
 *                  type: object
 *                  description: The details of the quiz session.
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */
router.post('/start', quizController.handleStartQuiz);

/**
 * @swagger
 * /quiz/submit:
 *   post:
 *     summary: Submit a user's answer for a question
 *     description: Submit a user's answer for a question in the current quiz session.
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: The ID of the quiz session.
 *               questionId:
 *                 type: string
 *                 description: The ID of the question being answered.
 *               userAnswer:
 *                 type: string
 *                 description: The user's answer to the question.
 *     responses:
 *       200:
 *         description: Answer submitted successfully
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Answer submitted successfully
 *                isCorrect:
 *                  type: boolean
 *                  description: Indicates whether the answer is correct.
 *                score:
 *                  type: number
 *                  description: The score earned for the answer.
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */
router.post('/submit', quizController.handleSubmitQuiz);

/**
 * @swagger
 * /quiz/end:
 *   post:
 *     summary: End a quiz session and save it to history
 *     description: End the current quiz session and save its details to the user's quiz history.
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: The ID of the quiz session to end.
 *     responses:
 *       200:
 *         description: Quiz session ended successfully
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Quiz session ended successfully
 *                historyItem:
 *                  type: object
 *                  description: The details of the quiz session saved to history.
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */
router.post('/end', quizController.handleEndQuiz);

module.exports = router;