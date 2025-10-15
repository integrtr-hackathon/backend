import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    userPermissions: mongoose.Schema.Types.Mixed,
})

const roleSchema = new mongoose.Schema(
  {
    role_id: {
      type: Number,
      required: true,
      unique: true, 
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    rbpOnly: {
      type: Boolean,
      default: false,
    },
    lastModified: {
      type: Date,
    },
    actions: {
      type: [String],
      default: [],
    },
    permissions: permissionSchema,
  },
  { timestamps: true }
);

export const Role = mongoose.model("Role", roleSchema);
