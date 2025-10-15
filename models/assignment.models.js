import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    assignment_id: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role', 
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    accessPopulation: {
      type: [String], 
      default: [],
    },
    targetPopulation: {
      type: String,
    },
    status: {
      type: String,
    },
    lastModified: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Assignment = mongoose.model("Assignment", assignmentSchema);