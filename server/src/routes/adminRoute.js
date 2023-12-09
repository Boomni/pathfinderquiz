const router = require("express").Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-related operations
 */

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Get a list of all admin users.
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of admin users.
 *       500:
 *         description: Internal server error.
 */
router.get('/', authMiddleware(['superuser']), adminController.getAdminUsers);

/**
 * @swagger
 * /admin/requests:
 *   get:
 *     summary: Get a list of all who request to be admin and which requests are pending.
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of users who request to be admin and which requests are pending.
 *       500:
 *         description: Internal server error.
 */
router.get('/requests', authMiddleware(['superuser']), adminController.getAdminRequests);

/**
 * @swagger
 * /admin/requests/approved:
 *   get:
 *     summary: Get a list of all who request to be admin have been approved.
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of users who request to be admin have been approved.
 *       500:
 *         description: Internal server error.
 */
router.get('/approved', authMiddleware(['superuser']), adminController.getAdminRequestsApproved);

/**
 * @swagger
 * /admin/requests/rejected:
 *   get:
 *     summary: Get a list of all who request to be admin are rejected.
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of users who request to be admin are rejected.
 *       500:
 *         description: Internal server error.
 */
router.get('/rejected', authMiddleware(['superuser']), adminController.getAdminRequestsRejected);

module.exports = router;