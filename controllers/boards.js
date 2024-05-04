import Board from '../models/Board.js';
import User from '../models/User.js';

//READ

export const getBoards = async (req, res) => {
  try {
    const { userId } = req.params;
    const board = await Board.find({ userId: userId });
    res.status(200).json(board);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//CREATE

export const createBoard = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name } = req.body;
    const user = await User.findById(userId);

    const newBoard = new Board({
      userId,
      name,
    });
    await newBoard.save();
    user.boards.push(newBoard);
    await user.save();

    // const board = await Board.find();
    res.status(201).json(user.boards);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

//UPDATE

export const updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const board = await Board.findById(id);
    const user = await User.findById(board.userId);
    if (user.boards.some((board) => board._id.toString() === id)) {
      user.boards = user.boards.filter((board) => board._id.toString() !== id);
    }

    await user.save();

    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    user.boards.push(updatedBoard);
    await user.save();

    res.status(200).json(updatedBoard);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//DELETE

export const deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    
    const board = await Board.findById(id);
    const user = await User.findById(board.userId);
    if (user.boards.some((board) => board._id.toString() === id)) {
      user.boards = user.boards.filter((board) => board._id.toString() !== id);
    }
    await user.save();

    await Board.findByIdAndDelete(id);

    res.status(200).json(user.boards);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
