import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Board = mongoose.model('Board', BoardSchema);
export default Board;
