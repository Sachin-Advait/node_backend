import express from "express";

const router = express.Router();

import {
  handleUserSignup,
  handleUserLogin,
  handleDeleteUserById,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
} from "../controllers/user.js";

router.route("/").post(handleUserSignup);
router.route("/login").post(handleUserLogin);
router.route("/").get(handleGetAllUsers);
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);
export default router;
