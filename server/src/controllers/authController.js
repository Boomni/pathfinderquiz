const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const { CustomError } = require('../middlewares/errorHandler');

const register = expressAsyncHandler(async (req, res) => {
  const { username, password, role, email, firstname, lastname } = req.body;

  if (!username || !password || !email || !firstname || !lastname || !role) {
    throw new CustomError('Please fill out all entries!', 400);
  }
  try {

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!firstname || !lastname ) {
      return res.status(400).json({ error: 'Firstname and Lastname are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      firstname,
      lastname,
      password: hashedPassword,
      role,
      email,
    });

    if (role === 'admin') {
      newUser.status = 'pending'
    }

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new CustomError('Invalid Credentials', 401);
  }
  try {
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '10m',}
    );
    const refreshToken = jwt.sign(
      { "email": user.email },
      process.env.REFRESH_KEY,
      { expiresIn: '2d' }
  );

  user.refreshToken = refreshToken;
  const result = await user.save();
  
  res.cookie('jwt', refreshToken, { 
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 3 * 24 * 60 * 60 * 1000
  });

  res.status(200).json({ message: "Login successful", token });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Login failed' });
}
});

module.exports = {
  register,
  login,
};