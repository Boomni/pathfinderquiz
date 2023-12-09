const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const { CustomError } = require('../middlewares/errorHandler');

const getUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const getUserById = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User details retrieved successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user making the request is an admin and the user to be deleted is not a pathfinder
    if (req.user.role === 'admin' && user.role !== 'pathfinder') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    if (req.user.role === 'superuser' && user.role === 'superuser') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const updateUser = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, firstname, lastname } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (username) {
      user.username = username;
    }
    if (firstname) {
      user.firstname = firstname;
    }
    if (lastname) {
      user.lastname = lastname;
    }

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'User update failed' });
  }
});

const searchUser = expressAsyncHandler(async (req, res) => {
  try {
      const { username, firstname, lastname } = req.query;

      const query = {};
      if (username) {
          query.username = { $regex: new RegExp(username), $options: 'i' }; // Case-insensitive username search
      }
      if (firstname) {
          query.firstname = { $regex: new RegExp(firstname), $options: 'i' }; // Case-insensitive firstname search
      }
      if (lastname) {
          query.lastname = { $regex: new RegExp(lastname), $options: 'i' }; // Case-insensitive lastname search
      }

      const users = await User.find(query);

      res.status(200).json(users);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  searchUser
};