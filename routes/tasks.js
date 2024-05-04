import express from 'express'
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/tasks.js';
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

//READ
router.get("/:boardId",  getTasks)
// router.get("/:boardId", verifyToken, getTasks)

//CREATE
router.post('/:boardId', createTask);
// router.post('/:boardId', verifyToken, createTask);

//UPDATE
router.patch("/:id", updateTask)
// router.patch("/:id", verifyToken, updateTask)

//DELETE
router.delete("/:id",  deleteTask)
// router.delete("/:id", verifyToken, deleteTask)

export default router;