import express from "express";
import Task from "../models/Task.model.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user.id,
  });
  res.json(task);
});

router.get("/", protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

router.put("/:id", protect, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true },
  );
  res.json(task);
});

router.delete("/:id", protect, async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });
  res.json({ message: "Deleted" });
});

export default router;
