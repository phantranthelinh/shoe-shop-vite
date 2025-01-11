const User = require("../models/UserModel");
const fs = require("fs");
const path = require("path");
const { Province, Ward, District } = require("../models/ProvinceModel");
const filePath = path.join("data", "provinces.json");

const saveProvinceToDb = async () => {
  try {
    await Province.deleteMany();
    const data = fs.readFileSync(filePath, "utf-8");
    const dataObj = JSON.parse(data);

    if (dataObj.length > 0) {
      // Initialize arrays to hold province, district, and ward data
      const provinces = [];
      const districts = [];
      const wards = [];

      for (let province of dataObj) {
        for (let district of province.districts) {
          for (let ward of district.wards) {
            wards.push({
              ...ward,
              district_code: district.code,
            });
          }
          districts.push({
            ...district,
            province_code: province.code,
          });
        }
        provinces.push(province);
      }

      await Province.insertMany(provinces);
      await District.insertMany(districts);
      await Ward.insertMany(wards);
    }
  } catch (error) {
    console.error("Error reading data from file:", error);
    return [];
  }
};

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

module.exports = { saveProvinceToDb, createAdminUser };
