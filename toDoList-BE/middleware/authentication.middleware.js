import { notFound } from "./notFound.middleware.js";
import { verifyToken } from "../utils.js";

export const AuthenticateUser = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
    return notFound({ message: "token required", status: 403 }, req, res, next);
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const tokenVerified = verifyToken(token);
    if (tokenVerified) next();
  } catch (error) {
    console.error(error);
    return res.json({ message: "unauthorized user", status: 401 });
  }
};
