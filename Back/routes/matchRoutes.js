const express = require("express");

const {
  saveMatch,
} = require("./../controllers/matchController");

const router = express.Router();

router.route("/matches/").patch(saveMatch)

module.exports = router;