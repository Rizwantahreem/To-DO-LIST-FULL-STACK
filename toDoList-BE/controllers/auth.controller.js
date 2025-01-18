import User from "../models/users.model.js";
import { validateCreateUser } from "../validators/user.validator.js";
import { notFound } from "../middleware/notFound.middleware.js";

export const signUp = async (req, res, next) => {
  try {
    const validatedUser = validateCreateUser(req.body);

    if (!validatedUser) {
      return notFound(
        { message: "user validation failed", status: 400 },
        req,
        res,
        next
      );
    }

    const newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      provider: req.body.provider,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", data: user.email });
  } catch (error) {
    // Check for duplicate email error
    if (error.code === 11000 && error.keyPattern.email) {
      return res
        .status(400)
        .json({ message: "Email already exists", error: error.message });
    }
    notFound({ message: error.message, status: 400 }, req, res, next);
  }
};

export const logIn = (req, res, next) => {};
export const logOut = (req, res, next) => {};
export const resetPassword = (req, res, next) => {};
