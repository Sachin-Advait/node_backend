import express from "express";

import {
  handleAllGetURL,
  handleGenerateNewShortURL,
  handleGetURLAndUpdateHistory,
} from "../controllers/url.js";

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleGetURLAndUpdateHistory);
router.get("/", handleAllGetURL);

export default router;
