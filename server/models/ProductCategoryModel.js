var URLSlug = require("mongoose-slug-generator");
const mongoose = require("mongoose");

const ProductCatergorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, slug: "name" },
    image: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);
ProductCatergorySchema.plugin(URLSlug);
const ProductCategory = mongoose.model(
  "ProductCategory",
  ProductCatergorySchema
);
module.exports = ProductCategory;
