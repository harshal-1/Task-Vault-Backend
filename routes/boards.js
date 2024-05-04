import express from 'express'
import { getBoards, createBoard, updateBoard, deleteBoard } from '../controllers/boards.js';
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

//READ
router.get("/:userId", getBoards)
// router.get("/", verifyToken, getBoards)

//CREATE
router.post('/:userId', createBoard);
// router.post('/:userId', verifyToken, createBoard);

//UPDATE
router.patch("/:id", updateBoard)
// router.patch("/:id", verifyToken, updateBoard)

//DELETE
router.delete("/:id", deleteBoard)
// router.patch("/:id", verifyToken, deleteBoard)

export default router;