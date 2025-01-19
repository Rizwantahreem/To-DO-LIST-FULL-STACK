import jwt from "jsonwebtoken";

/** validating token when user sends it to server */
export const verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (err) {
    throw new Error("Token expired or invalid");
  }
};

/**
 * generated token if not avaiable |
 * on sign up
 * @param userId
 */
export const generateToken = (userId) => {
  const payload = { userId };
  const secretKey = process.env.SECRET_KEY;
  const options = { expiresIn: process.env.TOKEN_EXPIRATION };

  return jwt.sign(payload, secretKey, options);
};
