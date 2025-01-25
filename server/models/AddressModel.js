const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  addressLine: { type: String, required: true },
  province: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Province",
    required: true,
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
  ward: { type: mongoose.Schema.Types.ObjectId, ref: "Ward", required: true },
  isDefault: { type: Boolean, default: false },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
