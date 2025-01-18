import User from "../models/users.model.js";
import { notFound } from "../middleware/notFound.middleware.js";
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        console.log(users);
        res
            .statusCode(200)
            .json({ data: users, mesasge: "users found successfully" });
    }
    catch (error) {
        console.error("users not found", error);
        notFound({ error: "users not Found", status: 404 }, req, res);
    }
};
