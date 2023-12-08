const Class = require('../models/classModel');

const addClass = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name ) {
      return res.status(400).json({ error: 'Class name is required' });
    }
    if (!description) {
      return res.status(400).json({ error: 'Class description is required' });
    }

    const existingClass = await Class.findOne({ name });
    if (existingClass) {
      return res.status(409).json({ error: 'Class already exists' });
    }

    const newClass = new Class({
      name,
      description,
    });

    await newClass.save();

    res.status(201).json({
      message: 'Class created successfully',
      newClass,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Class creation failed' });
  }
};

const getClasses = async (req, res) => {
  try {
    const classes = await Class.find();

    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getClassById = async (req, res) => {
  try {
    const classId = req.params.classId;
    const theClass = await Class.findById(classId);

    if (!theClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json({ message: 'Class details retrieved successfully', theClass });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteClass = async (req, res) => {
  const classId = req.params.classId;

  try {
    const deletedClass = await Class.findByIdAndRemove(classId);

    if (!deletedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.status(204).json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const updateClass = async (req, res) => {
    try {
      const classId = req.params.classId;
      const { name, description } = req.body;
  
      const theClass = await Class.findById(classId);
  
      if (!theClass) {
        return res.status(404).json({ error: 'Class not found' });
      }
  
      if (name) {
        theClass.name = name;
      }
      if (description) {
        theClass.description = description;
      }
  
      await theClass.save();
  
      res.status(200).json({ message: 'Class updated successfully', theClass });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Class update failed' });
    }
  };

module.exports = { addClass, getClasses, getClassById, deleteClass, updateClass};