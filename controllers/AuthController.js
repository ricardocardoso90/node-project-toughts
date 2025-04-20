const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login');
  };

  static register(req, res) {
    res.render('auth/register');
  };

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    if (password != confirmpassword) {
      req.flash('message', 'As senhas não são iguais, tente novamente!');
      res.render('auth/register');

      return
    };

    const checkIfUsersExists = await User.findOne({ where: { email: email } });
    if (checkIfUsersExists) {
      req.flash('message', 'O e-mail já está em uso, tente outro!');
      res.render('auth/register');

      return
    };

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword
    };

    try {
      const createdUser = await User.create(user);

      req.session.userid = createdUser.id;

      req.flash("message", "Usuário cadastrado com sucesso!! Parabéns.");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    };
  };
};