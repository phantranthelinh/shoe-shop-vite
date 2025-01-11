const mongoose = require("mongoose");

const ProvinceSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  name: { type: String, required: true },
  phone_code: { type: Number, required: true },
  codename: { type: String, required: true },
  division_type: { type: String, required: true },
});

const DistrictSchema = new mongoose.Schema({
  province_code: { type: Number, required: true },
  code: { type: Number, required: true },
  name: { type: String, required: true },
  short_codename: { type: String, required: true },
  codename: { type: String, required: true },
  division_type: { type: String, required: true },
});

const WardSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  name: { type: String, required: true },
  codename: { type: String, required: true },
  division_type: { type: String, required: true },
  district_code: { type: Number, required: true },
});

// Create models
const Province = mongoose.model("Province", ProvinceSchema);
const District = mongoose.model("District", DistrictSchema);
const Ward = mongoose.model("Ward", WardSchema);

// Export all models
module.exports = {
  Province,
  District,
  Ward,
};
