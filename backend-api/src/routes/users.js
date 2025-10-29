import { Router } from 'express';
import { getUserGreeting } from '../services/users.js';

const router = Router();

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const result = getUserGreeting(userId);
  if (!result) {
    return res.status(404).json({ error: 'User not found', userId });
  }
  return res.json(result);
});

export default router;
