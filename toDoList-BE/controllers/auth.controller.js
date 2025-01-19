import bcrypt from "bcrypt";
// database
import User from "../models/user.model.js";
import { validateCreateUser } from "../validators/user.validator.js";
import { notFound } from "../middleware/notFound.middleware.js";
import { generateToken } from "../utils.js";

/** Token structure is Bearer <jwt token>  */

// @ POST - auth/signup
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

    // insert user after hashing the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
      provider: req.body.provider,
    });
    await newUser.save();

    // assign token to the user as a cookie
    const token = generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript access (mitigates XSS)
      sameSite: "strict", // Prevents CSRF (Cross-Site Request Forgery) attacks
      maxAge: 3600 * 4, // Cookie expiration time (4 hour here, matches JWT expiration)
    });

    res.status(201).json({ message: "User created successfully" });
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

// @ POST - auth/login
export const logIn = async (req, res, next) => {
  try {
    let user = await User.find({ email: req.body.email });
    user = user[0];

    if (!user) throw new Error("no user with this email existed.");

    const isMacthedPass = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isMacthedPass) throw new Error("password is in correct");

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript access (mitigates XSS)
      sameSite: "strict", // Prevents CSRF (Cross-Site Request Forgery) attacks
      maxAge: 3600 * 4, // Cookie expiration time (4 hour here, matches JWT expiration)
    });

    res.status(200).json({ messsage: "login successfullly" });
  } catch (error) {
    console.log(error);
    notFound({ message: error, status: 400 }, req, res);
  }
};

export const logOut = (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
    });
    res.status(200).json({ message: "log out successfully" });
  } catch (error) {
    notFound(
      { message: "Error occurend while logging out.", status: 500 },
      req,
      res
    );
  }
};
