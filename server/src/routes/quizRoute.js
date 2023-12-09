// quizRoutes.js

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
 *               categoryId:
 *                 type: string
 *               classId:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               numQuestions:
 *                 type: number
 *     responses:
 *       200:
 *         description: Quiz session started successfully
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/QuizResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
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
 *               questionId:
 *                 type: string
 *               userAnswer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Answer submitted successfully
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/AnswerResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
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
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */
router.post('/end', quizController.handleEndQuiz);

module.exports = router;
