const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");

const asyncHandler = require("express-async-handler");

const OverviewController = {
  getOverview: asyncHandler(async (req, res) => {
    try {
      const totalOrders = await Order.count({});
      const totalProducts = await Product.count({});
      const totalUsers = await Product.count({
        isAdmin: false,
      });
      const data = {
        totalOrders,
        totalUsers,
        totalProducts,
      };
      res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }),
};

module.exports = OverviewController;
