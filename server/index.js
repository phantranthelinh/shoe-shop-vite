const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/Database");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const categoryRouter = require("./routes/productCategoryRoute");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/Error");
const userRouter = require("./routes/userRoute");
const provinceRouter = require("./routes/provinceRoute");
const overviewRouter = require("./routes/overviewRoute");
const reviewRouter = require("./routes/reviewRoute");
const imageRouter = require("./routes/imageRoute");

const { createAdminUser, saveProvinceToDb } = require("./infra");
dotenv.config();
connectDatabase();

const app = express();
app.use(cors());
app.use(express.json());
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

// API

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/provinces", provinceRouter);
app.use("/api/overviews", overviewRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/images", imageRouter);

// createAdminUser();
// saveProvinceToDb();
//ERROR HANDLER

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log(`server running on port ${PORT}`));
