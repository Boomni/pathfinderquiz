const router = require("express").Router();
const resourceController = require('../controllers/resourceController');
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Resource-related operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the resource.
 *         description:
 *           type: string
 *           description: Description of the resource.
 *         content:
 *           type: string
 *           description: The content of the resource.
 *         classId:
 *           $ref: '#/components/schemas/Class'
 *           description: The ID of the class associated with the resource (optional).
 *         categoryId:
 *           $ref: '#/components/schemas/Category'
 *           description: The ID of the category associated with the resource (optional).
 *       example:
 *         title: Sample Resource
 *         description: A sample resource
 *         content: Lorem ipsum...
 *         classId: "classId1"
 *         categoryId: "categoryId1"
 */

/**
 * @swagger
 * /resources/add:
 *   post:
 *     summary: Add a new resource
 *     description: Create a new resource with optional associations to classes and categories.
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Resource created successfully
 *                 newResource:
 *                   $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict (Resource already exists)
 *       500:
 *         description: Internal server error
 */
router.post('/add', authMiddleware(['admin', 'superuser']), resourceController.addResource);

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get a list of all resources
 *     description: Retrieve a list of all resources in the system.
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: List of Resource objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal server error
 */
router.get('/', resourceController.getResources)

/**
 * @swagger
 * /resources/update/{resourceId}:
 *   put:
 *     summary: Update a resource by categoryId
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         description: The ID of the resource to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *     responses:
 *       200:
 *         description: Resource updated successfully
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:resourceId', authMiddleware(['admin', 'superuser']), resourceController.updateResource);

/**
 * @swagger
 * /resources/delete/{resourceId}:
 *   delete:
 *     summary: Delete a resource by resourceId
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         description: The ID of the resource to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Resurce deleted successfully
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:resourceId', authMiddleware(['admin', 'superuser']), resourceController.deleteResource);

/**
 * @swagger
 * /resources/{resourceId}:
 *   get:
 *     summary: Get resource details by resourceId
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         description: The ID of the resource to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resource details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Resource details retrieved successfully
 *                 category:
 *                   $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Internal server error
 */
router.get('/:resourceId', resourceController.getResourceById);

/**
 * @swagger
 * /resources/class/{classId}:
 *   get:
 *     summary: Get resources by class ID.
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: The ID of the class for which to retrieve resources.
 *     responses:
 *       200:
 *         description: An array of resource objects.
 *       500:
 *         description: Internal server error.
 */
router.get('/class/:classId', resourceController.getResourcesByClass );  

/**
 * @swagger
 * /resources/category/{categoryId}:
 *   get:
 *     summary: Get resources by category ID.
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category for which to retrieve resources.
 *     responses:
 *       200:
 *         description: An array of resource objects.
 *       500:
 *         description: Internal server error.
 */
router.get('/category/:categoryId', resourceController.getResourcesByCategory);

/**
 * @swagger
 * /resources/like/{resourceId}:
 *   post:
 *     summary: Like a resource.
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         description: The ID of the resource to like.
 *     responses:
 *       200:
 *         description: The updated resource object.
 *       404:
 *         description: Resource not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/like/:resourceId', resourceController.likeResource);
  
  /**
   * @swagger
   * /resources/liked/{userId}:
   *   get:
   *     summary: Get liked resources by user.
   *     tags: [Resources]
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: The ID of the user for which to retrieve liked resources.
   *     responses:
   *       200:
   *         description: An array of resource objects.
   *       500:
   *         description: Internal server error.
   */
router.get('/liked/:userId', resourceController.getLikedResourcesByUser );

module.exports = router;