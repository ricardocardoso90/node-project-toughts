const User = require("../models/User");
const Tought = require("../models/Tought");

module.exports = class ToughtController {
  static async showToughts(req, res) {
    res.render("toughts/home");
  };

  static async dashboard(req, res) {
    res.render("toughts/dashboard");
  };
};