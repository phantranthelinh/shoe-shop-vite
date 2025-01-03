var URLSlug = require("mongoose-slug-generator");
const mongoose = require("mongoose");
mongoose.plugin(URLSlug);

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    slug: { type: String, slug: "name" },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
