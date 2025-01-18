import mongoose, { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true }, // Reference to the user
    date: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    taskName: { type: String, required: true },
    taskDesc: { type: String, required: true },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE", "CANCELLED"],
      default: "TODO",
    },
    tags: [{ type: String, required: false }],
  },
  { timestamps: true }
);

const task = mongoose.model.task || model("task", taskSchema);

export default task;
