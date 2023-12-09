const Category = require('../models/categoryModel');
const Class= require('../models/classModel');

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const classId = req.params.classId;
    const theClass = await Class.findById(classId);

    if (!theClass) {
      return res.status(404).json({ error: 'Class not found' });
    }
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // Check if a category with the same name exists in the same class
    const existingCategory = await Category.findOne({ name, classId });
    if (existingCategory) {
      return res.status(409).json({ error: 'Category with the same name already exists in this class' });
    }

    if (!description) {
      return res.status(400).json({ error: 'Category description is required' });
    }

    const newCategory = new Category({
      name,
      description,
      classId,
    });

    await newCategory.save();

    res.status(201).json({
      message: `Category created successfully in ${theClass.name} class`,
      newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Category creation failed' });
  }
};


const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const theCategory = await Category.findById(categoryId);

    if (!theCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category details retrieved successfully', theCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCategoriesByClassId = async (req, res) => {
  try {
    const classId = req.params.classId;
    const theClass = await Class.findById(classId);
    if (!theClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    const categories = await Category.find({ classId });

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(204).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const updateCategory = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const { name, description } = req.body;
  
      const theCategory = await Category.findById(categoryId);
  
      if (!theCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      if (name) {
        theCategory.name = name;
      }
      if (description) {
        theCategory.description = description;
      }

      await theCategory.save();

      res.status(200).json({ message: 'Category updated successfully', theCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Category update failed' });
    }
  };

module.exports = { addCategory, getCategoryById, getCategoriesByClassId, deleteCategory, updateCategory };