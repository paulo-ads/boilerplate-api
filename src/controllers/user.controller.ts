import { RequestHandler } from 'express';
import User from '../models/user.model.js';

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ err: 'User not found' });
      return;
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    await user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    await user.destroy();

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
