import mongoose, { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true }, // Primary identifier for users
    name: { type: String, required: false }, // Optional, for users who register with email/password
    provider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
    password: { type: String, required: false }, // Optional: Only set if user registers with email/password
    providerId: { type: String, required: false }, // Optional: OAuth provider's unique user ID
  },
  { timestamps: true }
);

const User = mongoose.model.user || model("user", userSchema);

export default User;
