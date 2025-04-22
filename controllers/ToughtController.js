const User = require("../models/User");
const Tought = require("../models/Tought");

module.exports = class ToughtController {
  static async showToughts(req, res) {
    res.render("toughts/home");
  };

  static createToughts(req, res) {
    res.render("toughts/create");
  };

  static async createToughtsPost(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    try {
      await Tought.create(tought);
      req.flash('message', "Pensamento criado com sucesso!");
      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      console.log(error);
    }
  };

  static async dashboard(req, res) {
    res.render("toughts/dashboard");
  };
};