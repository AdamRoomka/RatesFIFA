require("dotenv").config();
const { get } = require("http");

const teamRoutes = require("./routes/teamRoutes");
const matchRoutes = require("./routes/matchRoutes");
const userRoutes = require("./routes/userRoutes");
const guessRoutes = require("./routes/guessRoutes");

const express = require('express')
var cors = require("cors")
require("./DBconnection");
const path = require('path')
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 5002
const m2s = require('mongoose-to-swagger');
const auth = require("./auth");

const localtunnel = require('localtunnel');

(async () => {
  const tunnel = await localtunnel({ port: 3000,subdomain:'rates-fifa' });

console.log(`front: ${tunnel.url}`);
  tunnel.on('close', () => {
    // tunnels are closed
  });
})();
(async () => {
  const tunnel = await localtunnel({ port: 5002,subdomain:'fifa-rates-backend' });

  // the assigned public url for your tunnel
console.log(`back: ${tunnel.url}`);
  tunnel.on('close', () => {
    // tunnels are closed
  });
})();

    

var app = express();

express()
// .use(cors({
//   origin:'https://rates-fifa.loca.lt/'
// }))
.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept, Authorization"
  )
  
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE, OPTIONS"
    )
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    return res.status(200).json({})
  }
  next()
})
.use(bodyParser.urlencoded({
  extended: true
}))
.use(bodyParser.json())
.use("/api/v1/rates/", teamRoutes)
.use("/api/v1/rates/", matchRoutes)
.use("/api/v1/rates/", userRoutes)
.use("/api/v1/rates/", guessRoutes)

.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
// .post("*",auth)
// .get("/",auth)
.listen(PORT, () => console.log(`Listening on ${ PORT }`))

