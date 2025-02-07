const Images = require("../models/ImageModel");

const asyncHandler = require("express-async-handler");

const ImageController = {
  create: asyncHandler(async (req, res) => {
    const { url } = req.body;
    const newImage = new Images({ url });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  }),
};

module.exports = ImageController;
