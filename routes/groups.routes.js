import express from "express";
import multer from "multer"; // 1. Import multer
import { getGroups, importGroups } from "../controllers/group.controller.js";

const router = express.Router();

// 2. Configure multer to handle a single file upload from a field named 'raw'
const upload = multer();

// 3. Apply the multer middleware to your import route
router.post("/import", upload.single("raw"), importGroups);

// GET: Return all stored groups
router.get("/", getGroups);

export default router;