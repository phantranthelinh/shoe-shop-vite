const { Province, District, Ward } = require("../models/ProvinceModel");

const ProvinceController = {
  getProvinces: async (req, res) => {
    const provinces = await Province.find();
    res.json(provinces);
  },
  getDistricts: async (req, res) => {
    const { provinceId } = req.params;
    try {
      const province = await Province.findById(provinceId);
      const districts = await District.find({
        province_code: province.code,
      });
      res.status(200).json(districts);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getWards: async (req, res) => {
    const { districtId } = req.params;

    try {
      const district = await District.findById(districtId);
      const wards = await Ward.find({
        district_code: district.code,
      });
      res.status(200).json(wards);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

module.exports = ProvinceController;
