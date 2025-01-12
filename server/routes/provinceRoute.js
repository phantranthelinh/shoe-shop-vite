const express = require("express");

const router = express.Router();

const ProvinceController = require("../controllers/ProvinceController");
router.get("", ProvinceController.getProvinces);
router.get("/wards/:districtId", ProvinceController.getWards);
router.get("/districts/:provinceId", ProvinceController.getDistricts);

module.exports = router;
