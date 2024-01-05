const express = require("express");

const { contback } = require("./../controllers/continuesController");

const router = express.Router();

router.route("/").get(contback);

module.exports = router;
