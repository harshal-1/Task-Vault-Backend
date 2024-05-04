import Task from '../models/Task.js';
import Board from '../models/Board.js';
import User from '../models/User.js';

//READ

export const getTasks = async (req, res) => {
  try {
    const { boardId } = req.params;
    const task = await Task.find({ boardId: boardId });
    res.status(200).json(task);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//CREATE

export const createTask = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { desc } = req.body;

    const board = await Board.findById(boardId)

    const user = await User.findById(board.userId);
    if (user.boards.some((board) => board._id.toString() === boardId)) {
      user.boards = user.boards.filter((board) => board._id.toString() !== boardId);
    }

    await user.save();

    const newtask = new Task({
      boardId,
      desc,
    });
    await newtask.save();
    board.tasks.push(newtask)
    await board.save()
    user.boards.push(board)
    await user.save()

    res.status(201).json(newtask);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

//UPDATE

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { desc } = req.body;
    
    const task = await Task.findById(id);
    const board = await Board.findById(task.boardId);

    const user = await User.findById(board.userId);
    if (user.boards.some((board) => board._id.toString() === task.boardId)) {
      user.boards = user.boards.filter((board) => board._id.toString() !== task.boardId);
    }
    await user.save();

    if (board.tasks.some((task) => task._id.toString() === id)) {
      board.tasks = board.tasks.filter((task) => task._id.toString() !== id);
    }
    await board.save();


    const updatedtask = await Task.findByIdAndUpdate(
      id,
      { desc },
      { new: true }
    );

    board.tasks.push(updatedtask);
    await board.save();
    user.boards.push(board)
    await user.save()

    res.status(200).json(updatedtask);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//DELETE

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findById(id);
    const board = await Board.findById(task.boardId);

    const user = await User.findById(board.userId);
    if (user.boards.some((board) => board._id.toString() === task.boardId)) {
      user.boards = user.boards.filter((board) => board._id.toString() !== task.boardId);
    }
    await user.save();

    if (board.tasks.some((task) => task._id.toString() === id)) {
      board.tasks = board.tasks.filter((task) => task._id.toString() !== id);
    }    
    await board.save()
    user.boards.push(board)
    await user.save()

    await Task.findByIdAndDelete(id);

    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
