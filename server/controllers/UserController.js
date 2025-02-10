const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const Address = require("../models/AddressModel");
const UserController = {
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createAt: user.createdAt,
      });
    } else {
      res.status(400);
      throw new Error("Sai tài khoản hoặc mật khẩu");
    }
  }),
  register: asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User already exist");
    }
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createAt: user.createdAt,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  }),
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createAt: user.createdAt,
        addresses: user?.addresses || [],
        phoneNumber: user.phoneNumber,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }),

  updateProfile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { name, password } = req.body;

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    user.name = name || user.name;
    user.password = password || user.password;

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser._id,
    });
  }),

  getAddress: asyncHandler(async (req, res) => {
    const data = await Address.find({
      userId: req.user._id,
    })
      .populate("province")
      .populate("ward")
      .populate("district");
    res.status(200).json(data);
  }),

  addAddress: asyncHandler(async (req, res) => {
    const address = await Address.create({
      userId: req.user._id,
      ...req.body,
    });
    res.status(200).json(address);
  }),

  getAllUsers: asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
  }),
};

module.exports = UserController;
