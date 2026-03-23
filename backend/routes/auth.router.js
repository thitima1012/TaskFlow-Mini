import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.models.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash });

  res.json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "No user" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Wrong pass" });

  const token = jwt.sign({ id: user._id }, process.env.SECRET);

  res.json({ token });
});

router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

export default router;
