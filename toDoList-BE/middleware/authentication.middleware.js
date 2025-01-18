import jwt from "jsonwebtoken";
import { notFound } from "./notFound.middleware";
export const AuthenticateUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
        return notFound({ error: "user is not allowed" }, req, res, next);
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ message: "user verified successfully", status: 200 });
    }
    catch {
        return res.json({ message: "user verified successfully", status: 404 });
    }
};
