const express = require("express");

const {
  getAllTeams,
  getTeamById
} = require("./../controllers/teamController");

const router = express.Router();

router.route("/teams/").get(getAllTeams);
router.route("/teams/:id/").get(getTeamById);


module.exports = router;