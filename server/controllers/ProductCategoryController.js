const asyncHandler = require("express-async-handler");

const ProductCategory = require("../models/ProductCategoryModel");
const ProductCategoryController = {
  getCategory: asyncHandler(async (req, res) => {
    const category = await ProductCategory.findById(req.params.id);
    res.json(category);
  }),
  getCategories: asyncHandler(async (req, res) => {
    const categories = await ProductCategory.find({}).sort({ createdAt: -1 });
    res.json(categories);
  }),
  addCategory: asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const category = new ProductCategory({ name, description });
    const createdCategory = await category.save();
    res.status(200).json(createdCategory);
  }),
  deleteCategory: asyncHandler(async (req, res) => {
    const category = await ProductCategory.findById(req.params.id);
    if (category) {
      await category.remove();
      res.json({ message: "Category deleted" });
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  }),
  editCategory: asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const category = await ProductCategory.findById(req.params.id);
    if (category) {
      category.name = name || category.name;
      category.description = description || category.description;
      const updatedCategory = await category.save();
      res.status(200).json(updatedCategory);
    } else {
      res.status(400);
      throw new Error("Category not found");
    }
  }),
};

module.exports = ProductCategoryController;
