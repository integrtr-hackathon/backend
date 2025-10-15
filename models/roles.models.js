import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    // The field in the DB is 'role_id', so we match it here.
    role_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    role_name: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
    last_modified_utc: {
      type: String, // Storing as String since it's just the date part
    },
    role_type: {
      type: String,
    },
    // These fields can be null, so no `required: true`
    sub_domain: {
      type: String,
    },
    user_type: {
      type: String,
    },
    visibility_type: {
      type: String,
    }
  },
  {
    // This tells Mongoose to use your existing 'created' and 'last_modified' fields
    // instead of creating its own 'createdAt' and 'updatedAt' fields.
    timestamps: { createdAt: 'created', updatedAt: 'last_modified' },
    
    // Allows Mongoose to read documents that have extra fields not defined in this schema
    strict: false, 
    
    // Explicitly tells Mongoose which collection to use
    collection: 'roles' 
  }
);

export const Role = mongoose.model("Role", roleSchema);