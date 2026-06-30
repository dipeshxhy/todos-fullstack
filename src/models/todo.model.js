import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title must be at most 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [5, 'Description must be at least 5 characters'],
      maxlength: [500, 'Description must be at most 500 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by is required'],
    },
  },
  { timestamps: true },
);

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
