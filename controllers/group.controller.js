import {Group} from "../models/groups.models.js";
import { extractData } from "../utils/parseRaw.js";
import fs from "fs";

// POST /api/groups/import — store parsed data
export const importGroups = async (req, res) => {
  try {
    // 1. Check for the uploaded file from multer, not req.body
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 2. Get the raw text by converting the file's buffer to a string
    const raw = req.file.buffer.toString("utf8");

    const data = extractData(raw);
    if (!data?.groupList) {
      return res.status(400).json({ message: "No group data found in file" });
    }
    
    // 3. (Optional but Recommended) Map the data to match your schema exactly
    const mappedGroups = data.groupList.map(group => ({
        groupId: group.groupId,
        groupName: group.groupName,
        groupLeader: group.groupLeader,
        activeMemberCount: group.activeMemberCount,
        allMemberCount: group.allMemberCount,
        lastModified: new Date(group.lastModified) // Convert string to a proper Date
    }));


    await Group.deleteMany({}); // Clear old data
    await Group.insertMany(mappedGroups); // Insert the clean, mapped data

    res.status(201).json({
      message: "Groups imported successfully",
      count: mappedGroups.length,
    });
  } catch (error) {
    console.error("Import error:", error);
    res.status(500).json({ message: "Failed to import data" });
  }
};

// GET /api/groups — fetch all groups
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
};
