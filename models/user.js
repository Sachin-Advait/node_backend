import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "NORMAL",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
