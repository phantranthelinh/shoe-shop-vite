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
      address: { type: String, required: true },
      customerName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      province: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Province",
      },
      district: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "District",
      },
      ward: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Ward",
      },
    },
    paymentMethod: {
      type: String,
      required: true,
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
