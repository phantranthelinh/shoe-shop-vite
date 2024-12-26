const Product = require("../models/ProductModel");
const ProductCategory = require("../models/ProductCategoryModel");
const asyncHandler = require("express-async-handler");

const ProductController = {
  addProduct: asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock, category } =
      req.body;
    const productExits = await Product.findOne({ name });

    if (productExits) {
      res.status(404);
      throw new Error("Product name already exist");
    } else {
      const product = new Product({
        name,
        price,
        description,
        image,
        countInStock,
        category,
        user: req.user._id,
      });
      if (product) {
        const createdProduct = await product.save();
        const categoryToUpdate = await ProductCategory.findById(category);
        if (categoryToUpdate) {
          categoryToUpdate.products.push(createdProduct._id);
          await categoryToUpdate.save();
          res.status(200).json(createdProduct);
        } else {
          res.status(400);
          throw new Error("Invalid product data");
        }
      }
    }
  }),
  getAProduct: asyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate(
        "category"
      );
      res.json(product);
    } catch (err) {
      res.status(404);
      throw new Error("Product not found");
    }
  }),
  getProductBySlug: asyncHandler(async (req, res) => {
    try {
      const product = await Product.findOne({
        slug: req.params.slug,
      }).populate("category reviews");

      res.json(product);
    } catch (err) {
      res.status(404);
      throw new Error("Product not found");
    }
  }),

  getProductByCategorySlug: asyncHandler(async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await ProductCategory.findOne({ slug }).populate(
        "products"
      );

      res.status(200).json({
        data: category,
      });
    } catch (err) {
      res.status(404);
      throw new Error(`Category with slug "${slug}" not found`);
    }
  }),
  getAllProducts: asyncHandler(async (req, res) => {
    try {
      const pageSize = 10;
      const page = Number(req.query.pageNumber) || 1;
      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          }
        : {};
      const count = await Product.countDocuments({ ...keyword });

      const products = await Product.find({ ...keyword })
        .populate("category")
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ _id: -1 });
      res
        .status(200)
        .json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (err) {
      res.status(500).json(err);
    }
  }),
  getAllProductsByAdmin: asyncHandler(async (req, res) => {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .populate("category");
    res.json(products);
  }),
  editProduct: asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock, category } =
      req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.description;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;

      const oldCategory = product.category;
      const newCategory = category || product.category;
      if (oldCategory !== newCategory) {
        if (oldCategory) {
          const oldCategoryDoc = await ProductCategory.findById(oldCategory);
          if (oldCategoryDoc) {
            oldCategoryDoc.products = oldCategoryDoc.products.filter(
              (prodId) => prodId.toString() !== product._id.toString()
            );
            await oldCategoryDoc.save();
          }
        }
        const newCategoryDoc = await ProductCategory.findById(newCategory);
        if (newCategoryDoc) {
          if (!newCategoryDoc.products.includes(product._id)) {
            newCategoryDoc.products.push(product._id);
            await newCategoryDoc.save();
          }
        }
      }
      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(400);
      throw new Error("Product not found");
    }
  }),
  deleteProduct: asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const category = await ProductCategory.findOne({
        name: product.category,
      });
      if (category) {
        category.products = category.products.filter(
          (prodId) => prodId.toString() !== product._id.toString()
        );
        await category.save();
      }
      await product.remove();
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  }),

  getRelatedProducts: asyncHandler(async (req, res) => {
    try {
      const product = await Product.findOne({
        slug: req.params.slug,
      });
      if (product) {
        const products = await Product.find({
          _id: { $ne: product.id },
          category: product.category,
        })
          .populate("category")
          .sort({ createdAt: -1 });
        res.json(products);
      }
    } catch (err) {
      res.status(404);
      throw new Error("Product not found");
    }
  }),

  addReview: asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(200).json({ Message: "Reviewed added" });
    } else {
      res.status(500).json("Product not found");
    }
  }),
};

module.exports = ProductController;
