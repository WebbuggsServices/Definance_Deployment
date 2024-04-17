import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import stripe from "../utils/stripe.js";
import { decodeToken, encodeToken } from "../utils/jwtToken.js";
import { Resend } from "resend";

const resend = new Resend(process.env.Resend_API);

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    if (user.isSubscriber) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        customerID: user.customerID,
        isSubscriber: user.isSubscriber
      });
    } else {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        customerID: user.customerID,
        isSubscriber: user.isSubscriber
      });
    }
  } else {
    res.status(401).json({
      message: "Invalid email or password",
    });
    throw new Error("Invalid email or password");
  }

 
});


const loginUrl = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const decoded = decodeToken(token);
  const { email } = decoded;
  const user = await User.findById(email);
  const { _id, name, customerID, isSubscriber } = user;
  if (user) {
    generateToken(res, user._id);
    res.json({
      _id,
      name,
      customerID,
      isSubscriber,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const Token = asyncHandler(async (req, res) => {
  const userId = "65e0f5c4c3c7be6bcc43664b";

  try {
    const resetUserToken = encodeToken(userId, "24h");
    res.send({ token: `/login?token=${resetUserToken}` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
  const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      if (existingUser.name === name && existingUser.email === email) {
        res.status(400);
        throw new Error("User with this name and email already exists");
      } else if (existingUser.name === name) {
        res.status(400);
        throw new Error("User with this name already exists");
      } else {
        res.status(400);
        throw new Error("User with this email already exists");
      }
    }

    let customerID = "";
    const customer = await stripe.customers.search({
      query: `email:'${email}'`,
    });
    if (customer.data.length === 0) {
      const customerData = await stripe.customers.create({
        email,
        name,
      });
      customerID = customerData.id;
    } else {
      customerID = customer.data[0].id;
    }

    // Create the user
    const user = await User.create({
      name,
      email,
      password,
      customerID,
    });

    // Respond with the user data and token
    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    POST user profile
// @route   POST /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);
  const { _id, name, customerID, isSubscriber } = user;
  if (user) {
    res.json({
      _id,
      name,
      customerID,
      isSubscriber,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PATCH /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { userId, name, password } = req.body;
  const user = await User.findById(userId);

  if (user) {
    if (name && name !== user.name) {
      const existingUser = await User.findOne({ name });
      if (existingUser) {
        res.status(400);
        throw new Error("User with this name already exists");
      }
      user.name = name;
    }

    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


// @desc    forget password
// @route   POST /api/users/forget-password
// @access  Public
const forgetPassword = asyncHandler(async (req, res) => {
  const email = req.body.email;

  // check user in the database or not
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      error: "User with that email does not exist",
    });
  }
  // Generate JWT token
  const tokenData = email;
  const resetUserToken = encodeToken(tokenData, "24h");
  // Save token and send reset password email
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword?token=${resetUserToken}`;
    const response = await resend.emails.send({
      from: process.env.ADMIN_EMAIL ?? "dewqfinancehelp@resend.dev",
      to: email,
      subject: "Reset Password",
      html: `Forgot Password Link <button><a href="${resetUrl}">Click Here</a></button>`,
    });
    res
      .status(200)
      .json({ success: true, data: "Email sent", response: response.data });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Email failed to send." });
  }
});

// @desc    reset password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;

  if (!token) return res.status(401).send({ error: "Unauthorized access" });
  if (!password) return res.status(400).json({ res: "please enter password" });
  try {
    var decoded = decodeToken(token);
    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(404).send({ error: "User not found" });
    user.password = password;
    await user.save();
    return res.status(200).send({ message: "Password Reset successful" });
  } catch (e) {
    return res.status(500).send({ error: "Server error" });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  loginUrl,
  getUserProfile,
  updateUserProfile,
  forgetPassword,
  resetPassword,
  Token,
};
