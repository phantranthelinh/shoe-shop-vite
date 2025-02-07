const Product = require("../models/ProductModel");
const ProductCategory = require("../models/ProductCategoryModel");
const asyncHandler = require("express-async-handler");

const ProductController = {
  addProduct: asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      sizes,
      countInStock,
      category,
      images,
    } = req.body;
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
        sizes,
        category,
        user: req.user._id,
        images,
      });
      if (!product) {
        res.status(400);
        throw new Error("Invalid product data");
      }
      const createdProduct = await product.save();
      res.status(200).json(createdProduct);
    }
  }),
  getAProduct: asyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate(
        "category review"
      );
      res.status(200).json(product);
    } catch (err) {
      res.status(404);
      throw new Error("Product not found");
    }
  }),
  getProductBySlug: asyncHandler(async (req, res) => {
    try {
      const product = await Product.findOne({
        slug: req.params.slug,
      }).populate("category");

      res.json(product);
    } catch (err) {
      res.status(404);
      throw new Error("Product not found");
    }
  }),

  getProductByCategorySlug: asyncHandler(async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await ProductCategory.findOne({ slug });
      const products = await Product.find({ category: category._id });

      res.status(200).json({
        data: products,
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
    const {
      name,
      price,
      description,
      sizes,
      image,
      countInStock,
      category,
      images,
    } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.sizes = sizes || product.sizes;
      product.image = image || product.image;
      product.images = images || product.images;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;

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
      const product = await Product.findOne({ slug: req.params.slug });
      if (!product) {
        throw new Error("Product not found");
      }
      const relatedProducts = await Product.find({
        _id: { $ne: product.id },
        category: product.category,
      })
        .populate("category")
        .sort({ createdAt: -1 });
      res.status(200).json(relatedProducts);
    } catch (err) {
      res.status(404).json({ message: "Product not found" });
    }
  }),
};

module.exports = ProductController;
