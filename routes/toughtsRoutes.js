const express = require("express");
const router = express.Router();

const ToughtController = require("../controllers/ToughtController");

router.get('/', ToughtController.showToughts);
router.get('/dashboard', ToughtController.dashboard);

module.exports = router;