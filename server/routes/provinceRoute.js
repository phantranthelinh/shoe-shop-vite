const express = require("express");

const router = express.Router();

const ProvinceController = require("../controllers/ProvinceController");
router.get("", ProvinceController.getProvinces);
router.get("/wards/:district_code", ProvinceController.getWards);
router.get("/districts/:province_code", ProvinceController.getDistricts);

module.exports = router;
