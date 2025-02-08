const Order = require("../models/OrderModel");
const Products = require("../models/ProductModel");

const asyncHandler = require("express-async-handler");

const OrderController = {
  // CREATE ORDER
  create: asyncHandler(async (req, res) => {
    const { orderItems, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const newOrder = new Order({
        orderItems,
        user: req.user._id,
        totalPrice,
      });
      orderItems.forEach(async (item) => {
        await Products.updateOne(
          { _id: item.product._id, "sizes.size": item.size },
          {
            $inc: { "sizes.$.quantity": -1, countInStock: -1 },
          }
        );
      });

      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    }
  }),
  update: asyncHandler(async (req, res) => {
    const { shippingInfo, paymentMethod } = req.body;
    const orderId = req.params.id;
    const order = await Order.findByIdAndUpdate(orderId, {
      shippingInfo,
      paymentMethod,
      orderStatus: "isOrdered",
    });
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.send({ message: "Order updated successfully" });
  }),
  //ORDER DETAILS
  detail: asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email ")
      .populate("shippingInfo.province")
      .populate("shippingInfo.ward")
      .populate("shippingInfo.district")
      .populate("orderItems.product", "id name image slug");
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  }),

  updateOrderStatus: asyncHandler(async (req, res) => {
    const { orderStatus } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      orderStatus,
    });
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  }),

  adminGetAllOrder: asyncHandler(async (req, res) => {
    const orders = await Order.find({})
      .populate("shippingInfo.province")
      .populate("shippingInfo.ward")
      .populate("shippingInfo.district")
      .populate("user", "id name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  }),

  getPendingOrder: asyncHandler(async (req, res) => {
    const orders = await Order.find({ orderStatus: "pending" })
      .populate("shippingInfo.province")
      .populate("shippingInfo.ward")
      .populate("shippingInfo.district")
      .populate("user", "id name email")

      .sort({ createdAt: -1 });
    res.json(orders);
  }),

  getOrderByUser: asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
      .populate("shippingInfo.province")
      .populate("shippingInfo.ward")
      .populate("shippingInfo.district")
      .sort({ _id: -1 });
    res.json(orders);
  }),

  deleteAllOrder: asyncHandler(async (req, res) => {
    await Order.deleteMany({});
    res.status(200).json("Deleted successfully!");
  }),

  deleteOrder: asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }
    res.json({ message: "Order deleted" });
  }),
};

module.exports = OrderController;
