const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const path = require("path");
let bodyParser = require("body-parser");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 8080;

require("./DBconnection");

const teamRoutes = require("./routes/teamRoutes");
const matchRoutes = require("./routes/matchRoutes");
const userRoutes = require("./routes/userRoutes");
const guessRoutes = require("./routes/guessRoutes");
// const contRoutes = require("./routes/continuesRoutes");
const socketHandler = require("./sockets/socketHandler");

express()
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE, OPTIONS"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      return res.status(200).json({});
    }
    next();
  })
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  .use(bodyParser.json());
app
  .use("/matches", matchRoutes)
  .use("/api/v1/rates/", teamRoutes)
  .use("/api/v1/rates/", userRoutes)
  .use("/api/v1/rates/", guessRoutes)
  // .use("/", contRoutes)

  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs");

socketHandler(io);

// Uruchom serwer na danym porcie
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
