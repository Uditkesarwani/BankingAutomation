const { userModels } = require("../models/userModels");
const { trasactionModels } = require("../models/trasactionModels");
const { accountModels } = require('../models/accountModels');
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // 🔐 import bcrypt

const GetUser = async(req, res) => {
  try {
    const email = req.user.email;
    const account = await accountModels.findOne({ email });

    if (!account) {
      return res.status(404).json({ success: false, message: "No account found" });
    }

    res.json({ success: true, account });
  } catch (error) {
    console.error("Fetch account error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const DepositMoney = async(req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: "Invalid deposit amount." });
    }

    const userEmail = req.user.email;
    const account = await accountModels.findOne({ email: userEmail });

    if (!account) {
      return res.status(404).json({ success: false, message: "Account not found." });
    }

    account.balance += Number(amount);
    await account.save();

    return res.status(200).json({
      success: true,
      message: `₹${amount} deposited successfully.`,
      newBalance: account.balance
    });

  } catch (err) {
    console.error("Deposit error:", err);
    return res.status(500).json({ success: false, message: "Server error while depositing." });
  }
};

const AccountDelete = async (req, res) => {
  try {
    const email = req.user.email;
    const userId = req.user.id;

    const deleted = await accountModels.findOneAndDelete({ email });

    if (!deleted) {
      return res.json({ success: false, message: "Account not found" });
    }

    await trasactionModels.deleteMany({ userId });

    res.json({ success: true, message: "Account and related transactions deleted successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const AccountDetail = async (req, res) => {
  try {
    const userId = req.user.id;
    const account = await accountModels.findOne({ userId });

    if (!account) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    res.status(200).json({ success: true, account });

  } catch (err) {
    console.error("Account fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const userTransferMoney = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID missing",
      });
    }

    const transactions = await trasactionModels.find({ userId });

    return res.status(200).json({
      success: true,
      transactions,
    });
  } catch (err) {
    console.error("Error in userTransferMoney:", {
      message: err.message,
      stack: err.stack,
    });

    return res.status(500).json({
      success: false,
      message: "Internal Server Error while fetching transactions",
      error: err.message,
    });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      success: true,
      message: "User successfully logged out",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const AccountCreate = async (req, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;
    const { name, email, phone, initialDeposit } = req.body;

    if (!name || !email || !phone || !initialDeposit) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (email !== userEmail) {
      return res.status(403).json({
        success: false,
        message: "Email doesn't match the logged-in user.",
      });
    }

    const existingAccount = await accountModels.findOne({ userId });
    if (existingAccount) {
      return res.status(400).json({
        success: false,
        message: "You already have a bank account.",
      });
    }

    const accountNo = "AC" + Math.floor(100000000 + Math.random() * 900000000);

    const newAccount = new accountModels({
      userId,
      name,
      email,
      phone,
      balance: parseFloat(initialDeposit),
      accountNo,
    });

    await newAccount.save();

    res.status(201).json({
      success: true,
      account: newAccount,
    });

  } catch (err) {
    console.error("Error creating account:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModels.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign(
  { id: user._id, email: user.email, role: "user" },
  process.env.JWT_SECRET,
  { expiresIn: "2d" }
);
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User successfully logged in",
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const setUsers = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password) {
      return res.json({ error: "Please fill all fields" });
    }

    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email already exists, please login." });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModels.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (!newUser) {
      return res.json({ error: "User not created, try again." });
    }

    res.json({ message: "User is created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.json({ error: "Server problem", success: false });
  }
};

module.exports = {
  setUsers,
  Login,
  Logout,
  userTransferMoney,
  AccountCreate,
  AccountDetail,
  AccountDelete,
  DepositMoney,
  GetUser
};
