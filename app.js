const express = require("express");
const { get } = require("http");
const cookieSession = require("cookie-session");
var bodyParser = require('body-parser');

const teamRoutes = require("./routes/teamRoutes");
const matchRoutes = require("./routes/matchRoutes");


const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(
  cookieSession({
    name: "user-session",
    secret: "JA", // should use as secret environment variable
    httpOnly: true
  })
);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use("/api/v1/rates/", teamRoutes);
app.use("/api/v1/rates/", matchRoutes);



module.exports = app;