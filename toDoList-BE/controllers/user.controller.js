import User from "../models/user.model.js";
import { notFound } from "../middleware/notFound.middleware.js";

// @ GET - /user
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ data: users, mesasge: "users found successfully" });
  } catch (error) {
    console.error("users not found", error);
    notFound({ message: "users not Found", status: 404 }, req, res);
  }
};

// @ GET - /user/:id
export const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });

    if (user) {
      res.status(200).json({ data: user, message: "user found successfully" });
    } else {
      console.error("user not found");
      notFound({ message: "user not Found", status: 404 }, req, res);
    }
  } catch (error) {
    notFound({ message: "user not Found", status: 404 }, req, res);
  }
};

export const resetPassword = (req, res, next) => {};
