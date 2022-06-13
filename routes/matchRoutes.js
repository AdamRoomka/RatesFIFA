const express = require("express");

const {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch
} = require("./../controllers/matchController");

const router = express.Router();

router.route("/matches/").patch(createMatch)
router.route("/matches/:id/").patch(updateMatch)
router.route("/matches/").get(getAllMatches)
router.route("/matches/:id/").get(getMatchById)

module.exports = router;