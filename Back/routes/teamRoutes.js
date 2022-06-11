const express = require("express");

const {
  getAllTeams,
} = require("./../controllers/teamController");

const router = express.Router();

router.route("/teams/").get(getAllTeams);

module.exports = router;