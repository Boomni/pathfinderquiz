const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const { CustomError } = require('../middlewares/errorHandler');

const handleRegister = expressAsyncHandler(async (req, res) => {
  const { username, password, role, email, firstname, lastname } = req.body;

  if (!username || !password || !email || !firstname || !lastname || !role) {
    throw new CustomError('Please fill out all entries!', 400);
  }
  try {

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
      email,
    });

    if (role === 'admin') {
      newUser.status = 'pending'
    }
    const superusers = process.env.SUPERUSERS
    if (superusers.includes(email)) {
      newUser.role = 'superuser'
      newUser.status = 'approved'
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

const handleLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    throw new CustomError('Please fill out both entries!', 400);
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw new CustomError('Invalid Credentials', 401);
    }
    const token = jwt.sign(
      { 
        userId: user.id, 
        role: user.role
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '10m',}
    );
    const refreshToken = jwt.sign(
      { "username": user.username },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '2d' }
  );

  user.refreshToken = refreshToken;
  await user.save();
  
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

const handleLogout = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    throw new CustomError('Please fill out both entries!', 400);
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw new CustomError('Invalid Credentials', 401);
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '10m',}
    );
    const refreshToken = jwt.sign(
      { "username": user.username },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '2d' }
  );

  user.refreshToken = refreshToken;
  await user.save();
  
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
  handleRegister,
  handleLogin,
  handleLogout
};