import express from "express";
import mongoose from "mongoose";
import connection from "./connection/DB.connection.js";
import userRoutes from "./routes/user.route.js";
import taskRoute from "./routes/task.route.js";
import authRoutes from "./routes/auth.route.js";
import { notFound } from "./middleware/notFound.middleware.js";

const PORT = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(express.json());

// For debugging
mongoose.set("debug", true);

// Ensure database is connected before starting the server
try {
  await connection();

  // Mounting routes
  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
  app.use("/task", taskRoute);

  // Not found middleware
  app.use(notFound);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Failed to connect to MongoDB", error);
  process.exit(1);
}
