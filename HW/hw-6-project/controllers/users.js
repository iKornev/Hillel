const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).send('Користувача не знайдено!');
  }

  res.send(user);
};

const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!user) {
    return res.status(404).send('Користувача не знайдено!');
  }

  res.send(user);
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send('Користувача видалено!');
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
