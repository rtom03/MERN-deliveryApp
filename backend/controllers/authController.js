import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { generateToken } from "../lib/utils.js";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "your email or password is not correct" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      res.status(404).json({ message: "your password is not correct" });
    }

    const token = generateToken(user._id, res);
    return res.status(201).json({ message: "Login successfully", token });
  } catch (err) {
    console.log(err);
  }
};

// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ message: "a user with email provided already exist" });
    }
    // validating email format and strong password

    if (!validator.isEmail(email)) {
      return res.json({ message: "provide a valid email" });
    }
    if (password.length < 8) {
      return res.json({ message: "password must be 8 min" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = generateToken(user._id, res);
    res.status(201).json({ message: "Token generated successfully", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { loginUser, registerUser };
