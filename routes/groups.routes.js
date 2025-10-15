import express from "express";
import multer from "multer"; // 1. Import multer
import {
  getGroups,
  importGroups,
  searchGroups,
} from "../controllers/group.controller.js";

const router = express.Router();

const upload = multer();

router.post("/import", upload.single("raw"), importGroups);

router.get("/", getGroups);

router.get("/search", searchGroups);

export default router;
