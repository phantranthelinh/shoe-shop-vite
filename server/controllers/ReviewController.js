const Product = require("../models/ProductModel");
const Review = require("../models/ReviewModel");

const asyncHandler = require("express-async-handler");

const ReviewController = {
  addReview: asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findOne({
      slug: req.params.productSlug,
    });
    if (product) {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
        product: product._id,
      };

      await Review.create(review);

      res.status(200).json({ Message: "Reviewed added" });
    } else {
      res.status(400).json("Product not found");
    }
  }),
  getReviewsByProductSlug: asyncHandler(async (req, res) => {
    const product = await Product.findOne({
      slug: req.params.productSlug,
    });
    if (!product) {
      res.status(400).json({ message: "Product not found" });
    }
    const data = await Review.find({
      product: product._id,
    }).populate("product user");

    res.status(200).json(data);
  }),
};

module.exports = ReviewController;
