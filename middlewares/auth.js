import { getUser } from "../services/auth.js";

export async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  console.log(userUid);

  if (!userUid) return res.redirect("/login");

  const user = getUser(userUid);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}
