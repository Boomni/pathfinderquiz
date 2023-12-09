const router = require("express").Router();
const questionsController = require('../controllers/questionsController');
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *    Question:
 *      type: object
 *      properties:
 *        question:
 *          type: string
 *          description: The question text.
 *        answer:
 *          type: string
 *          description: The correct answer.
 *        image:
 *          type: string
 *          description: URL or file path to an associated image (optional).
 *        options:
 *          type: array
 *          items:
 *            type: string
 *            description: An array of answer options.
 *        difficulty:
 *          type: string
 *          enum: [easy, medium, hard]
 *          description: The difficulty level of the question.
 *        classId:
 *          $ref: '#/components/schemas/Class'
 *        categoryId:
 *          $ref: '#/components/schemas/Category'
 *      required:
 *        - name
 *        - description
 */

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Questions-related operations
 */

/**
 * @swagger
 * /questions/add/{classId}/{categoryId}:
 *   post:
 *     summary: Add a new question to the quiz
 *     description: Creates a new question with the specified class and category.
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: The ID of the class where the question belongs.
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category where the question belongs.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question text.
 *               answer:
 *                 type: string
 *                 description: The correct answer.
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of answer options.
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *                 description: The difficulty level of the question.
 *     responses:
 *       201:
 *         description: Question created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Question created successfully.
 *                 newQuestion:
 *                   $ref: '#/components/schemas/Question'
 *       400:
 *         description: Bad Request (missing or invalid fields)
 *       404:
 *        description: Class or Category not found
 *       500:
 *         description: Internal server error
 */
router.post('/add/:classId/:categoryId', authMiddleware(['admin', 'superuser']), questionsController.addQuestion);

/**
 * @swagger
 * /questions/{questionId}:
 *   get:
 *     summary: Get a single question by its ID
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: The ID of the question to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Question details retrieved successfully
 *                 question:
 *                   $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
 *       500:
 *         description: Internal server error
 */
router.get('/:questionId', questionsController.getQuestionById);

/**
 * @swagger
 * /questions/update/{questionId}:
 *   put:
 *     summary: Update an existing question by its ID
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: The ID of the question to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The updated question text.
 *               answer:
 *                 type: string
 *                 description: The updated correct answer.
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An updated array of answer options.
 *               difficulty:
 *                 type: string
 *                 enum: ['easy', 'medium', 'hard']
 *                 description: The updated difficulty level of the question.
 *               image:
 *                 type: string
 *                 description: URL or file path to an associated image (optional).
 *     responses:
 *       200:
 *         description: Question updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Question updated successfully
 *                 updatedQuestion:
 *                   $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:questionId', authMiddleware(['admin', 'superuser']), questionsController.updateQuestion);

/**
 * @swagger
 * /questions/delete/{questionId}:
 *   delete:
 *     summary: Delete a question by its ID
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: The ID of the question to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Question deleted successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:questionId', authMiddleware(['admin', 'superuser']), questionsController.deleteQuestion);

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all questions
 *     tags:
 *       - Questions
 *     responses:
 *       200:
 *         description: Questions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 *       500:
 *         description: Internal server error
 */
router.get('/', questionsController.getAllQuestions);

/**
 * @swagger
 * /questions/class/{classId}:
 *   get:
 *     summary: Get questions by class
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: The ID of the class for which to retrieve questions.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Questions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 *       500:
 *         description: Internal server error
 */
router.get('/class/:classId', questionsController.getQuestionsByClass);

/**
 * @swagger
 * /questions/category/{classId}/{categoryId}:
 *   get:
 *     summary: Get questions by category in a class
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: The ID of the class for which to retrieve questions.
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category for which to retrieve questions.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Questions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 *       500:
 *         description: Internal server error
 */
router.get('/category/:classId/:categoryId', questionsController.getQuestionsByCategoryInClass);

module.exports = router;
