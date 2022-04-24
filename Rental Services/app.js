var express = require("express");
var path = require("path");
var logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
var indexRouter = require("./routes/index");
const db = require("./models");
const { response } = require("express");
db.sequelize.sync();
// db.sequelize.sync({ force: true });
var app = express();
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(indexRouter);

//error handling
app.use("*", function (req, res, next) {
  response.status(404).json({
    message: "Page not found",
  });
});

module.exports = app;
