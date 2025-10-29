import { Router } from 'express';
import { getUserGreeting } from '../services/users.js';

const router = Router();

// If no name is provided, return a helpful message
router.get('/', (_req, res) => {
  return res.status(400).json({
    error: "Missing name in path parameter",
    hint: "Use /{your-name}, e.g., /alice"
  });
});

router.get('/:userName', (req, res) => {
  const { userName } = req.params;
  const result = getUserGreeting(userName);
  return res.json(result);
});

export default router;
