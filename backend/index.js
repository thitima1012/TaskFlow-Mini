import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.router.js";
import taskRoutes from "./routes/task.router.js";

dotenv.config();

const app = express();

// ✅ CORS
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// ✅ MongoDB
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});