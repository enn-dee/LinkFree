import User from "../models/User.model.js";
import bcrypt from "bcrypt";

import { genrateToken } from "../../utils/generateToken.js";

export const signUp = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords didn't match" });
    }
    const user = await User.findOne({ username });

    if (user) {
      return res.status(501).json({ error: "user already exists" });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashPassword,
    });

    genrateToken(newUser._id, res);

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
    });
  } catch (err) {
    console.log("Error in signup controller: ", err.message);
    return res.status(501).json({ error: "Invalid Credientials" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const passwordMatch = await bcrypt.compare(password, user?.password || "");

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    genrateToken(user._id, res);

    return res.status(200).json({
      status: "Logged in",
      _id: user._id,
      username: user.username,
    });
  } catch (err) {
    console.error("Error in login controller: ", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
