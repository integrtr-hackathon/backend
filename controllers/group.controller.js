import { Group } from "../models/groups.models.js";
import { extractData } from "../utils/parseRaw.js";
import fs from "fs";

// POST /api/groups/import — store parsed data
export const importGroups = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    g;
    const raw = req.file.buffer.toString("utf8");

    const data = extractData(raw);
    if (!data?.groupList) {
      return res.status(400).json({ message: "No group data found in file" });
    }

    const mappedGroups = data.groupList.map((group) => ({
      groupId: group.groupId,
      groupName: group.groupName,
      groupLeader: group.groupLeader,
      activeMemberCount: group.activeMemberCount,
      allMemberCount: group.allMemberCount,
      lastModified: new Date(group.lastModified),
    }));

    await Group.deleteMany({});
    await Group.insertMany(mappedGroups);

    res.status(201).json({
      message: "Groups imported successfully",
      count: mappedGroups.length,
    });
  } catch (error) {
    console.error("Import error:", error);
    res.status(500).json({ message: "Failed to import data" });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

export const searchGroups = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query 'q' is required" });
    }

    const searchRegex = new RegExp(q, "i");

    const query = {
      $or: [
        { groupName: { $regex: searchRegex } },
        { groupLeader: { $regex: searchRegex } },
      ],
    };

    const groups = await Group.find(query);

    res.json(groups);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Failed to search for groups" });
  }
};
