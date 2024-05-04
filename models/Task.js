import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    boardId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },    
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
