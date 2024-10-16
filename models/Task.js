import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
      },
    dueDate: {
      type: Date,
    },
  });
   const Task = mongoose.model("Task",taskSchema);
  export default Task;