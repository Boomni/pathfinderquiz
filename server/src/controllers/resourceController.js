const Class = require('../models/classModel');
const Category = require('../models/categoryModel');
const Resource = require('../models/resourceModel');

const addResource = async (req, res) => {
  try {
    const { title, description, content, classId, categoryId } = req.body;

    if (!title ) {
      return res.status(400).json({ error: 'Resource name is required' });
    }
    if (!description) {
      return res.status(400).json({ error: 'Resource description is required' });
    }
    if (!content) {
      return res.status(400).json({ error: 'Resource content required' });
    }

    const existingResource = await Resource.findOne({ title });
    if (existingResource) {
      return res.status(409).json({ error: 'Resource already exists' });
    }
    const existingClass = await Class.findOne({ classId });
    if (classId && !existingClass) {
      return res.status(409).json({ error: "Class doesn't exist" });
    }
    const existingCategory = await Category.findOne({ categoryId });
    if (categoryId && !existingCategory) {
      return res.status(409).json({ error: "Category doesn't exist" });
    }

    const newResource = new Resource({
      title,
      description,
      content,
      classId,
      categoryId
    });

    await newResource.save();

    res.status(201).json({
      message: 'Resource created successfully',
      newResource,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Resource creation failed' });
  }
};

const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();

    res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getResourceById = async (req, res) => {
  try {
    const resourceId = req.params.resourceId;
    const theResource = await Resource.findById(resourceId);

    res.status(200).json(theResource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateResource = async (req, res) => {
    try {
      const resourceId = req.params.resourceId;
      const { title, description, content, classId, categoryId } = req.body;
  
      const theResource = await Resource.findById(resourceId);
  
      if (!theResource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
  
      if (title) {
        theResource.title = title;
      }
      if (description) {
        theResource.description = description;
      }
      if (content) {
        theResource.content = content;
      }
      if (classId) {
        theResource.classId = classId;
      }
      if (categoryId) {
        theResource.categoryId = categoryId;
      }

      await theResource.save();

      res.status(200).json({ message: 'Resource updated successfully', theResource });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Resource update failed' });
    }
  };

const deleteResource = async (req, res) => {
  const resourceId = req.params.resourceId;

  try {
    const deletedResource = await Resource.findByIdAndRemove(resourceId);

    if (!deletedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.status(204).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getResourcesByClass = async (req, res) => {
  try {
    const classId = req.params.classId;
    const resources = await Resource.find({ classId });

    res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getResourcesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const resources = await Resource.find({ categoryId: categoryId });

    res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const likeResource = async (req, res) => {
  try {
    const resourceId = req.params.resourceId;
    const userId = req.params.userId;

    const theResource = await Resource.findById(resourceId);

    if (!theResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    theResource.likes += 1;
    theResource.likedBy.push(userId);

    await theResource.save();

    res.status(200).json(theResource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Like operation failed' });
  }
};

const getLikedResourcesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const likedResources = await Resource.find({ likedBy: userId });

    res.status(200).json(likedResources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  addResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
  getResourcesByCategory,
  getResourcesByClass,
  likeResource,
  getLikedResourcesByUser,
};