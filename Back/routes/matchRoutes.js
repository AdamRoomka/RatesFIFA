const express = require("express");

const {
  saveMatch,
  getAllMatches
} = require("./../controllers/matchController");

const router = express.Router();

router.route("/matches/").patch(saveMatch)
router.route("/matches/").get(getAllMatches)

module.exports = router;