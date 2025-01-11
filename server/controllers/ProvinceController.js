const { Province, District, Ward } = require("../models/ProvinceModel");

const ProvinceController = {
  getProvinces: async (req, res) => {
    const provinces = await Province.find();
    res.json(provinces);
  },
  getDistricts: async (req, res) => {
    const { province_code } = req.params;
    const districts = await District.find({
      province_code: province_code,
    });
    res.status(200).json(districts);
  },
  getWards: async (req, res) => {
    const { district_code } = req.params;
    const wards = await Ward.find({
      district_code: district_code,
    });
    res.status(200).json(wards);
  },
};

module.exports = ProvinceController;
