import { User } from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import { setUsers } from "../services/auth.js";

export async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    res
      .status(400)
      .json({ status: false, data: {}, message: "We need a body!" });
  }

  const result = await User.create({
    name: name,
    email: email,
    password: password,
  });
  // return res.status(201).json({
  //   status: true,
  //   message: "User created successfully",
  //   data: result,
  // });
  return res.redirect("/");
}

export async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ status: false, data: {}, message: "We need a body!" });
  }

  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username & Password",
    });

  const sessionId = uuidv4();
  setUsers(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

export async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});

  return res.send({
    status: true,
    data: allDbUsers,
    message: "Users retrived successfully",
  });
}

export async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(404).json({
      status: false,
      message: "User not found",
    });

  return res.send({
    status: true,
    data: user,
    message: "User retrived successfully",
  });
}

export async function handleUpdateUserById(req, res) {
  const body = req.body;

  const updateUser = {
    name: body.name ?? User.name,
    gender: body.gender ?? User.gender,
    jobTitle: body.job_title ?? User.jobTitle,
  };

  const user = await User.findByIdAndUpdate(req.params.id, updateUser, {
    new: true,
    runValidators: true,
  });

  res.status(200).send({
    status: true,
    data: user,
    message: "Updated user successfully",
  });
}

export async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).send({
    status: true,
    message: "User deleted successfully",
  });
}
