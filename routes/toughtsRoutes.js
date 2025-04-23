const express = require("express");
const router = express.Router();

const checkAuth = require("../helpers/auth").checkAuth;
const ToughtController = require("../controllers/ToughtController");

router.get('/', ToughtController.showToughts);
router.get('/edit/:id', checkAuth, ToughtController.editTought);
router.post('/edit', checkAuth, ToughtController.editToughtPost);

router.get('/add', checkAuth, ToughtController.createToughts);
router.post('/add', checkAuth, ToughtController.createToughtsPost);

router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.post('/remove', checkAuth, ToughtController.removeTought);

module.exports = router;