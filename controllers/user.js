import { User } from "../models/user.js";

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
    firstName: body.first_name ?? User.firstName,
    lastName: body.last_name ?? User.lastName,
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

export async function handleCreateNewUser(req, res) {
  const body = req.body;

  if (
    !body ||
    !body.first_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    res
      .status(400)
      .json({ status: false, data: {}, message: "We need a body!" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
    gender: body.gender,
  });

  console.log("Result", result);

  return res.status(201).json({
    status: true,
    message: "User created successfully",
    data: result,
  });
}
