import express from 'express';
import { getUsers, getUser } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

//READ

router.get('/', getUsers);
router.get('/:id', getUser);
// router.get('/:id', verifyToken, getUser);

export default router;
