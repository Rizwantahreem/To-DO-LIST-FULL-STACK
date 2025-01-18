import User from "../models/users.model.mjs";
const logInValidator = async (req, res, next) => {
    const token = req.headers.authentication;
    console.log(token);
    if (!token) {
        res.json({ message: "Failed to validate the user." });
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return notFound({ error: "User not found", status: 400 }, req, res, next);
        }
    }
    catch (error) {
        console.error("failed to validate user", error);
    }
};
