import { getUser } from "../services/auth.js";

export function checkForAuthorization(req, res, next) {
  // const authorizationHeaderValue = req.headers["authorization"];
  const tokenCookie = req.cookies?.token;
  req.user = null;

  // if (!authorizationHeaderValue || authorizationHeaderValue.startsWith('Bearer')) return next();
  if (!tokenCookie) return next();

  // const token = authorizationHeaderValue.split("Bearer ")[1];
  const user = getUser(tokenCookie);
  req.user = user;

  return next();
}

export function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user)
      return res.redirect("/login");

    if (!roles.includes(req.user.role))
      return res.end("anAuthorized");
    return next();
  }
}

