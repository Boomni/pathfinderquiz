const router = require("express").Router();
const classController = require('../controllers/classController');
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *    Class:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 *      required:
 *        - name
 *        - description
 */

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Class-related operations
 */

/**
 * @swagger
 * /classes/add:
 *   post:
 *     summary: Create a new class
 *     description: Create a new class with a name and description.
 *     tags:
 *       - Classes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict (Class already exists)
 *       500:
 *         description: Internal server error
 */
router.post('/add', authMiddleware(['admin', 'superuser']), classController.addClass);

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get a list of all classes
 *     description: Retrieve a list of all classes in the patfinder.
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: List of Class objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class Not Found
 *       500:
 *         description: Internal server error
 */
router.get('/', classController.getClasses);

/**
 * @swagger
 * /classes/{classId}:
 *   get:
 *     summary: Get class details by classId
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: The ID of the class to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Class details retrieved successfully
 *                 class:
 *                   $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found
 *       500:
 *         description: Internal server error
 */
router.get('/:classId', classController.getClassById);

/**
 * @swagger
 * /classes/delete/{classId}:
 *   delete:
 *     summary: Delete a class.
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: ID of the class to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Class deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Class details deleted successfully
 *       404:
 *         description: Class not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete/:classId', authMiddleware(['admin', 'superuser']), classController.deleteClass);

/**
 * @swagger
 * /classes/update/{classId}:
 *   put:
 *     summary: Update class information
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: ID of the class to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Class information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:classId', authMiddleware(['admin', 'superuser']), classController.updateClass);

module.exports = router;