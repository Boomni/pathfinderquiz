const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User Login
 *     description: Logs in a user with a email and password. And returns an access token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           examples:
 *             value:
 *               email: user@mail.com
 *               password: securePassword
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  desciption: Successfully logged in
 *                token:
 *                  type: string
 *       400:
 *         description: Bad Request (Missing or invalid credentials)
 *       401:
 *         description: Unauthorized (Invalid credentials)
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', authController.handleLogin);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a username, firstname, lastname, email, role, and password. Role can be 'pathfinder', 'admin'. If the role is 'pathfineder', the user will be registered immediately. If the role is 'admin', the user's status will be set to 'pending' until approved by a superuser.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: ['pathfinder', 'admin']
 *               email:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *           examples:
 *             Login as Admin:
 *               summary: Administrator Registration
 *               value:
 *                 username: adminUser
 *                 password: securePassword
 *                 role: admin
 *                 email: admin@mail.com
 *                 firstname: John
 *                 lastname: Doe
 *             Login as Pathfinder:
 *               summary: Pathfinder Registration
 *               value:
 *                 username: pathfinder123
 *                 password: securePassword
 *                 role: pathfinder
 *                 email: pathfinder@mail.com
 *                 firstname: Jane
 *                 lastname: Smith
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: User successfully registered
 *                newUser:
 *                  $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict (User already exists)
 *       500:
 *         description: Internal server error
 */
router.post('/register', authController.handleRegister);

/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: User Logout
 *     description: Logs out the currently authenticated user, clears the session, and revokes the access token.
 *     tags: [Users]
 *     responses:
 *       204:
 *         description: User successfully logged out
 *       401:
 *         description: Unauthorized (No valid session found)
 *       500:
 *         description: Internal Server Error
 */
router.get('/logout', authController.handleLogout);

module.exports = router;