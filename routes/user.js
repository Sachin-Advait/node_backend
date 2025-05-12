import express from "express";

const router = express.Router();

import {
  handleCreateNewUser,
  handleDeleteUserById,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
} from "../controllers/user.js";

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);
export default router;
