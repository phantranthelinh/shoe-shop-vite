const Order = require("../models/OrderModel");

const asyncHandler = require("express-async-handler");

const RevenueController = {
  getDataChartRevenue: asyncHandler(async (req, res) => {
    try {
      const yearInt = new Date().getFullYear();

      const revenueData = await Order.aggregate([
        {
          $match: {
            deliveredAt: {
              $gte: new Date(yearInt, 0, 1),
              $lte: new Date(yearInt, 11, 31, 23, 59, 59),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$deliveredAt" },
            totalIncome: { $sum: "$totalPrice" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const expectedRevenueData = await Order.aggregate([
        {
          $match: {
            updatedAt: {
              $gte: new Date(yearInt, 0, 1),
              $lte: new Date(yearInt, 11, 31, 23, 59, 59),
            },
            orderStatus: "isOrdered",
          },
        },
        {
          $group: {
            _id: { $month: "$updatedAt" },
            totalIncome: { $sum: "$totalPrice" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const revenueByMonth = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        revenue: 0,
        expectedRevenue: 0,
      }));

      revenueData.forEach(({ _id, totalIncome }) => {
        revenueByMonth[_id - 1].revenue = totalIncome;
      });

      expectedRevenueData.forEach(({ _id, totalIncome }) => {
        revenueByMonth[_id - 1].expectedRevenue = totalIncome;
      });

      res.status(200).json(revenueByMonth);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }),
  getDataChartRevenueMonthly: asyncHandler(async (req, res) => {
    try {
      const now = new Date();
      const yearInt = now.getFullYear();
      const monthInt = req.query.month
        ? parseInt(req.query.month, 10)
        : now.getMonth() + 1;

      const startDate = new Date(yearInt, monthInt - 1, 1);
      const endDate = new Date(yearInt, monthInt, 0, 23, 59, 59);

      const revenueData = await Order.aggregate([
        {
          $match: {
            deliveredAt: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: { $dayOfMonth: "$deliveredAt" },
            totalIncome: { $sum: "$totalPrice" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const daysInMonth = new Date(yearInt, monthInt, 0).getDate();
      const revenueByDay = Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        revenue: 0,
      }));

      revenueData.forEach(({ _id, totalIncome }) => {
        revenueByDay[_id - 1].revenue = totalIncome;
      });

      res
        .status(200)
        .json({ month: monthInt, year: yearInt, data: revenueByDay });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }),
};

module.exports = RevenueController;
