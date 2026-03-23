import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  status: { type: String, default: "todo" },
  priority: { type: String, default: "low" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Task", schema);
