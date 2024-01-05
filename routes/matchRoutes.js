const express = require("express");

const {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
} = require("./../controllers/matchController");
const router = express.Router();

router.route("/matches/").post(createMatch);
router.route("/matches/").get(getAllMatches);
router.route("/matches/:id/").get(getMatchById);
router.route("/matches/:id/").post(updateMatch);
router.route("/matches/:id/").delete(deleteMatch);

module.exports = router;
