const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login');
  };

  static async loginPost(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash('message', 'Email não cadastrado, tente novamente!');
      res.render('auth/login');
      return
    };

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      req.flash('message', 'Senha inválida, tente novamente!');
      res.render('auth/login');
      return
    };

    req.session.userid = user.id;
    req.flash("message", "Usuário logado com sucesso!! Parabéns.");

    req.session.save(() => {
      res.redirect("/");
    });
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

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  };
};