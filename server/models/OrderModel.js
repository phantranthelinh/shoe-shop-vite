const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingInfo: {
      address: { type: String },
      customerName: { type: String },
      phoneNumber: { type: String },
      province: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province",
      },
      district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "District",
      },
      ward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ward",
      },
    },
    paymentMethod: {
      type: String,
      default: "cod",
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "pending",
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
