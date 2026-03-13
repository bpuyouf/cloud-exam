import express from 'express';
import { getUsers, addUser } from '../services/userService.js';

const router = express.Router();

// Simple CRUD endpoints for demonstration.
// In a production app, add request validation, authorization, and proper error handling.

router.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Failed to fetch users', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await addUser({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.error('Failed to create user', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

export default router;