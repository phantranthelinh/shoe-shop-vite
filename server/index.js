const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/Database");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const categoryRouter = require("./routes/productCategoryRoute");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/Error");
const userRouter = require("./routes/userRoute");
dotenv.config();
connectDatabase();

const app = express();
app.use(cors());
app.use(express.json());
const bodyParser = require("body-parser");
const User = require("./models/UserModel");

app.use(bodyParser.urlencoded({ extended: true }));
// API

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const createAdminUser = async () => {
  const email = "admin@gmail.com";
  const password = "123456";
  const isAdmin = true;
  const name = "admin";
  //  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    name,
    password,
    isAdmin,
  });

  try {
    await user.save();
    console.log("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// createAdminUser();

//ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log(`server running on port ${PORT}`));
