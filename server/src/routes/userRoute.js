const router = require("express").Router();
const { handleRegister } = require("../controllers/authController");
const userController = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: A unique name for the user
 *         firstname:
 *           type: string
 *           description: Firstname of the user
 *         lastname:
 *           type: string
 *           description: Surname of the user
 *         password:
 *           type: string
 *           description: A secure password
 *         role:
 *           type: string
 *           enum: ['user', 'admin']
 *           description: The role to signup with "admin" or "user"
 *         email:
 *           type: string
 *           description: An email address for admin registration
 *         status:
 *           type: string
 *           enum: ['pending', 'approved', 'rejected']
 *           description: The status of the admin registration request 
 *       example:
 *         username: rejoice
 *         firstname: Rejoice
 *         lastname: John
 *         password: d5fE_asz1c3
 *         role: user
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User-related operations
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     description: Retrieve a list of all users in the system. Only administrators have access to this.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of User objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware(['admin', 'superuser']), userController.getUsers);

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Search for users based on criteria
 *     description: Retrieve a list of users based on search criteria. You can search by username, firstname, and/or lastname. Provide the search criteria as query parameters.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: username
 *         description: Search by username (case-insensitive).
 *         schema:
 *           type: string
 *       - in: query
 *         name: firstname
 *         description: Search by firstname (case-insensitive).
 *         schema:
 *           type: string
 *       - in: query
 *         name: lastname
 *         description: Search by lastname (case-insensitive).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of User objects matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */
router.get('/search', authMiddleware(['admin', 'superuser']), userController.searchUser);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user details by userId
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: User details retrieved successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', authMiddleware(['admin', 'superuser']), userController.getUserById);

/**
 * @swagger
 * /users/delete/{userId}:
 *   delete:
 *     summary: Delete a user.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: User details deleted successfully
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete/:userId', authMiddleware(['admin', 'superuser']), userController.deleteUser);

/**
 * @swagger
 * /users/update/{userId}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:userId', userController.updateUser);

module.exports = router;