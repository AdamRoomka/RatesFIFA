require("dotenv").config();
const { get } = require("http");

const teamRoutes = require("./routes/teamRoutes");
const matchRoutes = require("./routes/matchRoutes");
const userRoutes = require("./routes/userRoutes");
const guessRoutes = require("./routes/guessRoutes");
const express = require('express')
require("./DBconnection");
const path = require('path')
var bodyParser = require('body-parser');
var cors = require("cors")
const PORT = process.env.PORT || 5002
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json')
const swaggerJSDoc = require('swagger-jsdoc');
const userModel = require('./models/userModel')
const teamModel = require('./models/teamModel')
const matchModel = require('./models/matchModel')
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
  const tunnel = await localtunnel({ port: 3001,subdomain:'rates-fifa-backend' });

  // the assigned public url for your tunnel
console.log(`back: ${tunnel.url}`);
  tunnel.on('close', () => {
    // tunnels are closed
  });
})();

    

var app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
  },
  // servers: [
  //   {
  //     url: 'https://rates-node.herokuapp.com/api/v1/rates/',
  //     description: 'Development server',
  //   },
  // ],
  tags:[
    {
      name:"Users"
    },
    {
      name: "Teams"
    },
    {
      name: "Matches"
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
swaggerSpec.definitions={
  User: m2s(userModel),
  Team: m2s(teamModel),
  Match: m2s(matchModel)
}

express()
.use(allowCrossDomain)
.use(bodyParser.urlencoded({
  extended: true
}))
.use(bodyParser.json())
.use("/api/v1/rates/", teamRoutes)
.use("/api/v1/rates/", matchRoutes)
.use("/api/v1/rates/", userRoutes)
.use("/api/v1/rates/", guessRoutes)
.use(cors())
.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// .post("*",auth)
// .get("/",auth)
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
