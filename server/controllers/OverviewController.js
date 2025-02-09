const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");

const asyncHandler = require("express-async-handler");

const OverviewController = {
  getOverview: asyncHandler(async (req, res) => {
    try {
      const now = new Date();
      const yearInt = now.getFullYear();
      const monthInt = now.getMonth() + 1;

      const startDate = new Date(yearInt, monthInt - 1, 1);
      const endDate = new Date(yearInt, monthInt, 0, 23, 59, 59);

      const totalIncome = await Order.aggregate([
        {
          $match: {
            updatedAt: { $gte: startDate, $lte: endDate },
            orderStatus: "isDelivered",
          },
        },
        {
          $group: {
            _id: null,
            totalIncome: { $sum: "$totalPrice" },
          },
        },
      ]);
      const totalOrders = await Order.count({});
      const totalProducts = await Product.count({});
      const totalUsers = await User.count({
        isAdmin: false,
      });
      const data = {
        totalOrders,
        totalUsers,
        totalProducts,
        totalMonthlyIncome:
          totalIncome.length > 0 ? totalIncome[0].totalIncome : 0,
      };
      res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }),
};

module.exports = OverviewController;
