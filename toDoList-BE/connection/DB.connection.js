import { connect } from "mongoose";
const connection = async () => {
  try {
    await connect(
      process.env.MONGO_LINK ||
        `mongodb+srv://tahreem1701203:KuiHck3VYn38Q7oc@todolist-cluster.wf6hz.mongodb.net/?retryWrites=true&w=majority&appName=ToDoList-Cluster`,
      {
        maxPoolSize: 10,
        connectTimeoutMS: 20000, // 20 seconds
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000, // Increase the socket timeout to avoid buffering issues
      }
    );
  } catch (error) {
    console.log("Failed to connect to mongo", error);
    throw new Error("Unable to connect to db");
  }
};

export default connection;
