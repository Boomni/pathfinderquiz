const router = require("express").Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require("../middlewares/authMiddleware");

  /**
 * @swagger
 * components:
 *   schemas:
 *    Category:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        classId:
 *          $ref: '#/components/schemas/Class'
 *      required:
 *        - name
 *        - description
 *        - classId
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category-related operations
 */

/**
 * @swagger
 * /categories/add/{classId}:
 *   post:
 *     summary: Create a new quiz category
 *     description: Creates a new quiz category with a name, description, and classId to associate it with a specific class.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: The ID of the class to which the category will be associated.
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
 *                 description: The name of the category.
 *               description:
 *                 type: string
 *                 description: A description of the category.
 *             example:
 *               name: New Category
 *               description: This is a new category.
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict (Category already exists)
 *       500:
 *         description: Internal server error
 */
router.post('/add/:classId', authMiddleware(['admin', 'superuser']), categoryController.addCategory);

/**
 * @swagger
 * /categories/{categoryId}:
 *   get:
 *     summary: Get category details by categoryId
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Category details retrieved successfully
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get('/:categoryId', categoryController.getCategoryById);

/**
 * @swagger
 * /categories/class/{classId}:
 *   get:
 *     summary: Get categories under a class by classId
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: The ID of the class for which to retrieve categories.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categories under the class retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       404:
 *         description: Class not found
 *       500:
 *         description: Internal server error
 */
router.get('/class/:classId', categoryController.getCategoriesByClassId);

/**
 * @swagger
 * /categories/delete/{categoryId}:
 *   delete:
 *     summary: Delete a category by categoryId
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:categoryId', authMiddleware(['admin', 'superuser']), categoryController.deleteCategory);

/**
 * @swagger
 * /categories/update/{categoryId}:
 *   put:
 *     summary: Update a category by categoryId
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category to update.
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
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:categoryId', authMiddleware(['admin', 'superuser']), categoryController.updateCategory);

module.exports = router;