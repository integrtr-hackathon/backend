import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  groupId: Number,
  groupName: String,
  groupLeader: String,
  activeMemberCount: Number,
  allMemberCount: Number,
  lastModified: String
});

export const Group = mongoose.model("Group", groupSchema);