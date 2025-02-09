import express from "express";
import cors from "cors";
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
// mongoose.set("debug", true);

// Database connection
try {
  await connection();

  console.log("Connected to database:", mongoose.connection.db.databaseName);

  // app.use(cors()); - automatec configuration
  // Proper CORS setup
  app.use(
    cors({
      origin: "http://localhost:4200",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );

  // Mounting routes
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/task", taskRoute);

  // Not found middleware
  app.use(notFound);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Failed to connect to MongoDB", error);
  process.exit(1);
}
