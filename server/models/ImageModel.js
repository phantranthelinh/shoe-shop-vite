const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema(
  {
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Images = mongoose.model("Images", ImageSchema);

module.exports = Images;
