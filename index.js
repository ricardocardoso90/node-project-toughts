const express = require('express');
const exphbs = require('express-handlebars');

const flash = require('express-flash');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();
const conn = require('./db/conn');

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

app.use(express.json());
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("home");
});

conn
  .sync()
  .then(() => app.listen(3000))
  .catch((error) => console.log(error));