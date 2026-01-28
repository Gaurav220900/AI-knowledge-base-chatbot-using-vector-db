import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash
  });

  res.json({ success: true });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({
      message: "User not found"
    });

  const match = await bcrypt.compare(
    password,
    user.password
  );

  if (!match)
    return res.status(400).json({
      message: "Wrong password"
    });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};

export const getUser = async (req, res) => {

  const user = await User.findById(req.user.id);
  res.status(200).json(user);
}