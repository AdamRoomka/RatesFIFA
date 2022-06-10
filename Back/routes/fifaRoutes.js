const express = require("express");

const {
  getAllFifa,
} = require("./../controllers/fifaController");

const router = express.Router();

router.route("/").get(getAllFifa);

module.exports = router;