const express = require('express');
const exphbs = require('express-handlebars');

const flash = require('express-flash');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();
const conn = require('./db/conn');

const Tought = require("./models/Tought");
const User = require("./models/User");

const authRoutes = require("./routes/authRoutes");
const toughtsRoutes = require("./routes/toughtsRoutes");

const ToughtController = require('./controllers/ToughtController');

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => { },
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    }
  })
);

app.use(flash());

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  };
  next();
});

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

app.use(express.json());
app.use(express.static("./public/"));
// app.use(express.static(__dirname + '/public'));

app.use("/", authRoutes);
app.use("/toughts", toughtsRoutes);

app.get("/", ToughtController.showToughts);


conn
  .sync()
  // .sync({ force: true })
  .then(() => app.listen(3000))
  .catch((error) => console.log(error));