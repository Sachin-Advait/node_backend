import express from "express";

const router = express.Router();

import {
  handleDeleteUserById,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleUserSignup,
} from "../controllers/user.js";

router.route("/signup").post(handleUserSignup);
router.route("/").get(handleGetAllUsers);
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);
export default router;
