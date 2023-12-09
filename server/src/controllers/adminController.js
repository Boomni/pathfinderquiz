const User = require('../models/userModel');

const getAdminUsers = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' });

    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAdminRequests = async (req, res) => {
  try {
    const requests = await User.find({ status: 'approved' });

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAdminRequestsApproved = async (req, res) => {
  try {
    const requests = await User.find({ status: 'approved' });

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAdminRequestsRejected = async (req, res) => {
  try {
    const requests = await User.find({ status: 'rejected' });

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAdminUsers,
  getAdminRequests,
  getAdminRequestsApproved,
  getAdminRequestsRejected
};