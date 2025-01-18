import { createConnection } from "mongoose";
const connection = async () => {
  try {
    await createConnection(process.env.MONGO_LINK, {
      maxPoolSize: 10,
      connectTimeoutMS: 20000, // 20 seconds
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000, // Increase the socket timeout to avoid buffering issues
    });
  } catch (error) {
    console.log("Failed to connect to mongo", error);
  }
};
export default connection;
